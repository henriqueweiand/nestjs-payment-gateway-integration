import { Injectable } from '@nestjs/common';

import { LoggerService } from '@app/logger';
import { PaymentType } from '@components/payment/enums/payment_type.enum';
import { PaymentLogService } from '@components/payment/payment-log/payment-log.service';
import { PaymentLogStatus } from '@components/payment/payment-log/payment_log_status.enum';
import { StripePaymentInput } from '@components/payment/stripe/dto/stripe_payment.input';
import { StripeService } from '@components/payment/stripe/stripe.service';

import { PaymentData, PaymentTransactionResult } from '../payment_processor.interfaces';
import { PaymentProcessorType } from '../payment_processor_type.enum';
import { PaymentProcessor } from './abstracts/payment.processor';

@Injectable()
export class StripeCardPaymentProcessor extends PaymentProcessor {
  protected paymentType: PaymentType = PaymentType.CARD;
  protected processorType = PaymentProcessorType.CARD_STRIPE;

  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly paymentLogService: PaymentLogService,
    protected readonly stripeService: StripeService,
  ) {
    super(loggerService, paymentLogService);
  }

  protected async _pay(_paymentData: PaymentData, paymentInput: StripePaymentInput): Promise<PaymentTransactionResult> {
    try {
      const response = await this.stripeService.createPaymentIntent(paymentInput.confirmationTokenId);

      return {
        status: PaymentLogStatus.COMPLETED_SUCCESSFULLY,
        result: {
          transaction: response, // TODO: get the right values
          message: 'Payment completed successfully',
        },
      };
    } catch (err) {
      return {
        status: PaymentLogStatus.FAILED,
        result: {
          message: err.message,
        },
      };
    }
  }
}
