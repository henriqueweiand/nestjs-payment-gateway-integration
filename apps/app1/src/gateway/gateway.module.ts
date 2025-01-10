import { Module } from '@nestjs/common';

import { LoggerModule } from '@app/logger';
import { PaymentModule } from '@components/payment';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [LoggerModule, PaymentModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
