/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import { LoggerService } from '@app/logger';
import { PaymentType } from '@components/checkout/enums/payment-type.enum';
import { PaymentLogStatus } from '@components/checkout/payment-log/payment-log-status.enum';
import { PaymentLogService } from 'libs/components/checkout/src/payment-log/payment-log.service';

import { StripeService } from 'libs/components/checkout/src/stripe/stripe.service';
import { PaymentProcessorType } from '../payment-processor-type.enum';
import { PaymentTransactionFailedResult, PaymentTransactionResult } from '../payment-processor.interfaces';
import { PaymentProcessor } from './payment.processor';
import { PaymentLog } from '@components/checkout/payment-log/payment-log.entity';

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
    return {
      result: {
        message: 'Payment completed successfully',
      },
    };
  }

  protected async _refund(paymentLog: PaymentLog): Promise<PaymentTransactionFailedResult> {
    return {
      message: 'Payment refunded successfully',
    };
  }
}
