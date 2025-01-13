import { Module } from '@nestjs/common';

import { LoggerModule } from '@app/logger';
import { PaymentProcessorsService } from './payment_processors.service';
import { StripeCardPaymentProcessor } from './processors/stripe_card_payment.processor';
import { PaymentLogModule } from '../payment-log/payment-log.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [LoggerModule, PaymentLogModule, StripeModule],
  providers: [
    PaymentProcessorsService, //
    StripeCardPaymentProcessor,
  ],
  exports: [PaymentProcessorsService],
})
export class PaymentProcessorsModule {}
