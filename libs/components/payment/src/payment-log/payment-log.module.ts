import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@app/logger';

import { PaymentLog } from './payment-log.entity';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([PaymentLog])],
  providers: [],
  exports: [],
})
export class PaymentLogModule {}
