import { Controller, Get } from '@nestjs/common';

import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('pay')
  pay() {
    return this.gatewayService.pay();
  }
}
