import { Body, Controller, Get, Post } from '@nestjs/common';

import { PaymentType } from '@components/payment/enums/payment_type.enum';
import { PaymentProcessorType } from '@components/payment/payment-processors/payment_processor_type.enum';
import { StripePaymentInput } from '@components/payment/stripe/dto/stripe_payment.input';

import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('pay-test')
  payTest() {
    return this.gatewayService.pay({
      amount: 100,
      currency: 'USD',
      payments: [
        {
          paymentType: PaymentType.CARD,
          processorType: PaymentProcessorType.CARD_STRIPE,
          amount: 100,
          currency: 'USD',
          confirmationTokenId: 'test',
        } as StripePaymentInput,
      ],
    });
  }

  @Post('pay')
  // TODO: create a DTO
  pay(@Body() payment: any) {
    return this.gatewayService.pay(payment);
  }
}
