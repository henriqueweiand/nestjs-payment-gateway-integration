import { CustomVoucherPaymentInput } from '../custom-voucher/dto/custom-voucher-payment.input';
import { PaymentCustomVoucherResult } from '../custom-voucher/dto/custom-voucher-payment.result';
import { PaymentType } from '../enums/payment-type.enum';
import { PaymentLogStatus } from '../payment-log/payment-log-status.enum';
import { StripePaymentInput } from '../stripe/dto/stripe-payment.input';
import { PaymentStripeResult } from '../stripe/dto/stripe-payment.result';

export type PaymentInput = StripePaymentInput | CustomVoucherPaymentInput; // Add all others as needed

export interface PaymentData {
  type: PaymentType;
  paymentId: string;
  amount: number;
}

export type PaymentResult = PaymentStripeResult | PaymentCustomVoucherResult; // Add all others as needed

export interface PaymentTransactionResult {
  status: PaymentLogStatus;
  result: PaymentResult;
}
