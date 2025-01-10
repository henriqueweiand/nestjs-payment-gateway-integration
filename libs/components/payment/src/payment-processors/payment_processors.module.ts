import { Module } from '@nestjs/common';

import { LoggerModule } from '@app/logger';
import { PaymentProcessorsService } from './payment_processors.service';
import { StripeCardPaymentProcessor } from './processors/stripe_card_payment.processor';
import { PaymentLogModule } from '../payment-log/payment-log.module';

@Module({
  imports: [LoggerModule, PaymentLogModule],
  providers: [
    PaymentProcessorsService, //
    StripeCardPaymentProcessor,
  ],
  exports: [PaymentProcessorsService],
})
export class PaymentProcessorsModule {}
