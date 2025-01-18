import { Injectable } from '@nestjs/common';

import { Logger, LoggerService } from '@app/logger';
import { PaymentType } from '@components/checkout/enums/payment-type.enum';
import { PaymentLogStatus } from '@components/checkout/payment-log/payment-log-status.enum';

import { PaymentLog } from '../../payment-log/payment-log.entity';
import { PaymentLogService } from '../../payment-log/payment-log.service';
import { PaymentProcessorType } from '../payment-processor-type.enum';
import { PaymentData, PaymentInput, PaymentTransactionResult } from '../payment-processor.interfaces';

@Injectable()
export abstract class PaymentProcessor<Input extends PaymentInput = PaymentInput> {
  protected readonly logger: Logger;
  protected abstract paymentType: PaymentType | null;
  protected abstract processorType: PaymentProcessorType;

  protected constructor(
    protected readonly loggerService: LoggerService,
    protected readonly paymentLogService: PaymentLogService,
  ) {
    this.logger = this.loggerService.getLogger(PaymentProcessor.name);
  }

  protected abstract _pay(paymentData: PaymentData, paymentInput: Input): Promise<PaymentTransactionResult>;

  async pay(paymentData: PaymentData, paymentInput: Input): Promise<PaymentLog> {
    const paymentLogData = new PaymentLog({
      amount: paymentInput.amount,
      paymentType: paymentData.type,
      input: paymentInput,
      status: PaymentLogStatus.PENDING,
      checkoutId: paymentData.paymentId,
    });

    const paymentLog = await this.paymentLogService.create(paymentLogData);

    return this._payAndUpdateLog(paymentLog, paymentData);
  }

  private async _payAndUpdateLog(paymentLog: PaymentLog, paymentData: PaymentData): Promise<PaymentLog> {
    try {
      const { status, result } = await this._pay(paymentData, paymentLog.input as Input);

      return this.paymentLogService.update(paymentLog, {
        status,
        result,
        processedDate: new Date(),
      });
    } catch (err) {
      const result = err instanceof Error ? err.message : err;
      return this.paymentLogService.update(paymentLog, {
        status: PaymentLogStatus.FAILED,
        processedDate: new Date(),
        result,
      });
    }
  }
}
