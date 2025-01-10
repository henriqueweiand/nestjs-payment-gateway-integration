import { Logger, LoggerService } from '@app/logger';
import { Injectable } from '@nestjs/common';
import { PaymentType } from '../enums/payment_type.enum';
import { PaymentProcessorType } from './payment_processor_type.enum';
import { PaymentProcessor } from './processors/abstracts/payment.processor';
import { StripeCardPaymentProcessor } from './processors/stripe_card_payment.processor';

// TODO: Review or put it somewhere else to export
export type PartialRecord<T extends string | number | symbol, K> = Partial<Record<T, K>>;

@Injectable()
export class PaymentProcessorsService {
  private logger: Logger;

  private typeProcessorsMap: PartialRecord<PaymentType, PartialRecord<PaymentProcessorType, PaymentProcessor> | PaymentProcessor> = {
    [PaymentType.CARD]: {
      [PaymentProcessorType.CARD_STRIPE]: this.stripeCardPaymentProcessor,
    },
    // [PaymentType.ICOUPON]: this.iCouponPaymentProcessor,
  };

  constructor(
    private readonly loggerService: LoggerService,
    private readonly stripeCardPaymentProcessor: StripeCardPaymentProcessor,
  ) {
    this.logger = this.loggerService.getLogger(PaymentProcessorsService.name);
  }

  getProcessor(paymentType: PaymentType, processorType?: PaymentProcessorType): PaymentProcessor {
    const paymentProvider = processorType
      ? (this.typeProcessorsMap[paymentType]?.[processorType] ?? this.typeProcessorsMap[paymentType])
      : this.typeProcessorsMap[paymentType];

    if (!paymentProvider) {
      throw new Error(`No payment provider found for payment type: ${paymentType}`);
    }

    return paymentProvider;
  }
}
