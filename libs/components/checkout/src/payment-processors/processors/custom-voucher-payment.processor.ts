import { Injectable } from '@nestjs/common';

import { LoggerService } from '@app/logger';
import { PaymentType } from '@components/checkout/enums/payment-type.enum';
import { PaymentLogStatus } from '@components/checkout/payment-log/payment-log-status.enum';
import { PaymentLogService } from 'libs/components/checkout/src/payment-log/payment-log.service';

import { StripeService } from 'libs/components/checkout/src/stripe/stripe.service';
import { PaymentProcessorType } from '../payment-processor-type.enum';
import { PaymentTransactionResult } from '../payment-processor.interfaces';
import { PaymentProcessor } from './payment.processor';

@Injectable()
export class CustomVoucherPaymentProcessor extends PaymentProcessor {
  protected paymentType: PaymentType = PaymentType.VOUCHER;
  protected processorType = PaymentProcessorType.CUSTOM_VOUCHER;

  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly paymentLogService: PaymentLogService,
    protected readonly stripeService: StripeService,
  ) {
    super(loggerService, paymentLogService);
  }

  protected async _pay(): Promise<PaymentTransactionResult> {
    try {
      // This is a fake implementation for the sake of the example
      // In a real-world scenario, this would be a call to the voucher service

      return {
        status: PaymentLogStatus.COMPLETED_SUCCESSFULLY,
        result: {
          transaction: 'voucher-transaction-id',
          message: 'Payment completed successfully',
        },
      };
    } catch (err) {
      return {
        status: PaymentLogStatus.FAILED,
        result: {
          message: err.message,
        },
      };
    }
  }
}
