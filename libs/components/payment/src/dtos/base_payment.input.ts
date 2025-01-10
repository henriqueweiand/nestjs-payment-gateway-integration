import { IsPositive } from 'class-validator';

import { PaymentProcessorType } from '../payment-processors/payment_processor_type.enum';
import { PaymentType } from '../enums/payment_type.enum';

export abstract class BasePaymentInput {
  processorType?: PaymentProcessorType;

  @IsPositive()
  amount: number;

  currency: string;

  paymentType: PaymentType;
}
