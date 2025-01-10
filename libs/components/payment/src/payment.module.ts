import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@app/logger';

import { PaymentLogModule } from './payment-log/payment-log.module';
import { Payment } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), LoggerModule, PaymentLogModule],
  providers: [],
  exports: [],
})
export class PaymentModule { }
