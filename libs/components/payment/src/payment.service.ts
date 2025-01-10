import { Logger, LoggerService } from '@app/logger';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificPaymentInputs } from './dtos/combined_payment.input';
import { PaymentProcessorsService } from './payment-processors/payment_processors.service';
import { Payment } from './payment.entity';
import { ProcessPaymentsInput } from './payment.interfaces';
import { PaymentStatus } from './enums/payment_status.enum';

@Injectable()
export class PaymentService {
  private logger: Logger;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly paymentProcessorsService: PaymentProcessorsService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {
    this.logger = this.loggerService.getLogger(PaymentService.name);
  }

  async processPayments(processPaymentsInput: ProcessPaymentsInput) {
    const paymentInputs = processPaymentsInput.payments;

    const paymentData = new Payment({
      amount: processPaymentsInput.amount,
      currency: processPaymentsInput.currency,
      status: PaymentStatus.INITIALIZED,
      input: processPaymentsInput,
    });

    const payment = await this._createPayment(paymentData);

    const paymentResults = await Promise.all(paymentInputs.map(paymentInput => this._processOne(payment, paymentInput)));
    return paymentResults;
  }

  private async _processOne(payment: Payment, paymentInput: SpecificPaymentInputs) {
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

  private async _createPayment(payment: Payment) {
    return this.paymentRepository.save(payment);
  }
}
