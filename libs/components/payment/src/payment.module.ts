import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@app/logger';

import { PaymentLogModule } from './payment-log/payment-log.module';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { PaymentProcessorsModule } from './payment-processors/payment_processors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), LoggerModule, PaymentLogModule, PaymentProcessorsModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
