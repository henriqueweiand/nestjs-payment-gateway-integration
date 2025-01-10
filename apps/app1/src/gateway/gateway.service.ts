import { Injectable } from '@nestjs/common';

import { Logger, LoggerService } from '@app/logger';
import { PaymentService } from '@components/payment/payment.service';
import { PaymentType } from '@components/payment/enums/payment_type.enum';
import { PaymentProcessorType } from '@components/payment/payment-processors/payment_processor_type.enum';
import { StripePaymentInput } from '@components/payment/stripe/dto/stripe_payment.input';

@Injectable()
export class GatewayService {
  private readonly logger: Logger;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly paymentService: PaymentService,
  ) {
    this.logger = this.loggerService.getLogger(GatewayService.name);
  }

  async pay() {
    const response = await this.paymentService.processPayments({
      amount: 100,
      currency: 'USD',
      payments: [
        {
          paymentType: PaymentType.CARD,
          processorType: PaymentProcessorType.CARD_STRIPE,
          amount: 100,
          currency: 'USD',
        } as StripePaymentInput,
      ],
    });

    return response;
  }
}
