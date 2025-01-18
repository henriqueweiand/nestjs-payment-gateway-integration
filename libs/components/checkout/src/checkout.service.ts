import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Logger, LoggerService } from '@app/logger';

import { Checkout } from './checkout.entity';
import { ProcessPaymentsInput } from './checkout.interfaces';
import { SpecificPaymentInputs } from './dtos/combined_payment.input';
import { PaymentStatus } from './enums/payment-status.enum';
import { PaymentProcessorsService } from './payment-processors/payment-processors.service';

@Injectable()
export class CheckoutService {
  private logger: Logger;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly paymentProcessorsService: PaymentProcessorsService,
    @InjectRepository(Checkout)
    private readonly checkoutRepository: Repository<Checkout>,
  ) {
    this.logger = this.loggerService.getLogger(CheckoutService.name);
  }

  async processPayments(processPaymentsInput: ProcessPaymentsInput) {
    const paymentInputs = processPaymentsInput.payments;

    const paymentData = new Checkout({
      amount: processPaymentsInput.amount,
      currency: processPaymentsInput.currency,
      status: PaymentStatus.INITIALIZED,
      input: processPaymentsInput,
    });

    const checkout = await this._createCheckout(paymentData);

    try {
      const paymentResults = await Promise.all(paymentInputs.map(paymentInput => this._processOnePayment(checkout, paymentInput)));
      checkout.status = PaymentStatus.COMPLETED;
      await this.checkoutRepository.save(checkout);

      return paymentResults;
    } catch (error) {
      this.logger.error('Error processing payments', error);
      checkout.status = PaymentStatus.FAILED_PAYMENT;
      await this.checkoutRepository.save(checkout);

      throw error;
    }
  }

  private async _processOnePayment(payment: Checkout, paymentInput: SpecificPaymentInputs) {
    const { paymentType, processorType } = paymentInput;

    const paymentProcessor = this.paymentProcessorsService.getProcessor(paymentType, processorType);

    const paymentData = {
      type: paymentType,
      paymentId: payment.id,
      amount: payment.amount,
    };

    const paymentLog = await paymentProcessor.pay(paymentData, paymentInput);

    return paymentLog;
  }

  private async _createCheckout(payment: Checkout) {
    return this.checkoutRepository.save(payment);
  }
}
