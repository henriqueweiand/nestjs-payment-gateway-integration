/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import { Logger, LoggerService } from '@app/logger';
import { PaymentType } from '@components/payment/enums/payment_type.enum';
import { PaymentLog } from '@components/payment/payment-log/payment-log.entity';
import { PaymentLogService } from '@components/payment/payment-log/payment-log.service';
import { PaymentLogStatus } from '@components/payment/payment-log/payment_log_status.enum';

import { PaymentData, PaymentInput, PaymentTransactionResult } from '../../payment_processor.interfaces';
import { PaymentProcessorType } from '../../payment_processor_type.enum';

@Injectable()
export abstract class PaymentProcessor<Input extends PaymentInput = PaymentInput, Result = unknown> {
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
      paymentId: paymentData.paymentId,
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
