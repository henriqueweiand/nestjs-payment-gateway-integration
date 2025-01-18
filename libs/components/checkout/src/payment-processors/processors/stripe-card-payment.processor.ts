import { Injectable } from '@nestjs/common';

import { LoggerService } from '@app/logger';
import { PaymentType } from '@components/checkout/enums/payment-type.enum';
import { PaymentLogStatus } from '@components/checkout/payment-log/payment-log-status.enum';
import { PaymentLogService } from 'libs/components/checkout/src/payment-log/payment-log.service';

import { StripePaymentInput } from '@components/checkout/stripe/dto/stripe-payment.input';
import { StripeService } from 'libs/components/checkout/src/stripe/stripe.service';
import { PaymentProcessorType } from '../payment-processor-type.enum';
import { PaymentData, PaymentTransactionResult } from '../payment-processor.interfaces';
import { PaymentProcessor } from './payment.processor';

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
      const response = await this.stripeService.createPaymentIntent({
        confirmationTokenId: paymentInput.confirmationTokenId,
        amount: paymentInput.amount,
        currency: paymentInput.currency,
      });

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
