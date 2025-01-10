import { Injectable } from '@nestjs/common';

import { PaymentType } from '@components/payment/enums/payment_type.enum';
import { LoggerService } from '@app/logger';

import { PaymentProcessorType } from '../payment_processor_type.enum';
import { PaymentProcessor } from './abstracts/payment.processor';
import { PaymentLogService } from '@components/payment/payment-log/payment-log.service';
import { PaymentLogStatus } from '@components/payment/payment-log/payment_log_status.enum';
import { PaymentData, PaymentTransactionResult } from '../payment_processor.interfaces';
import { StripePaymentInput } from '@components/payment/stripe/dto/stripe_payment.input';

@Injectable()
export class StripeCardPaymentProcessor extends PaymentProcessor {
  protected paymentType: PaymentType = PaymentType.CARD;
  protected processorType = PaymentProcessorType.CARD_STRIPE;

  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly paymentLogService: PaymentLogService,
  ) {
    super(loggerService, paymentLogService);
  }

  //   eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async _pay(_paymentData: PaymentData, _paymentInput: StripePaymentInput): Promise<PaymentTransactionResult> {
    return {
      status: PaymentLogStatus.COMPLETED_SUCCESSFULLY,
      result: {
        message: 'Payment completed successfully',
      },
    };
  }
}
