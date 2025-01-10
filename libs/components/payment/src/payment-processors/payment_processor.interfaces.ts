import { PaymentType } from '../enums/payment_type.enum';
import { PaymentLogStatus } from '../payment-log/payment_log_status.enum';
import { StripePaymentInput } from '../stripe/dto/stripe_payment.input';
import { PaymentStripeResult } from '../stripe/dto/stripe_payment.result';

export type PaymentInput = StripePaymentInput;

export interface PaymentData {
  type: PaymentType;
  paymentId: string;
  amount: number;
}

export type PaymentResult = PaymentStripeResult;

export interface PaymentTransactionResult {
  status: PaymentLogStatus;
  result: PaymentResult;
}
