import { BasePaymentInput } from '@components/payment/dtos/base_payment.input';
import { PaymentType } from '@components/payment/enums/payment_type.enum';
import { PaymentProcessorType } from '@components/payment/payment-processors/payment_processor_type.enum';

export class StripePaymentInput extends BasePaymentInput {
  confirmationTokenId: string;

  processorType = PaymentProcessorType.CARD_STRIPE;
  paymentType = PaymentType.CARD;
}
