import { Column, CreateDateColumn, DeepPartial, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PaymentLog } from './payment-log/payment-log.entity';
import { PaymentStatus } from './payment_status.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToMany(() => PaymentLog, payment => payment.payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  paymentLog: PaymentLog[];

  @Column('varchar', { length: 60, name: 'external_id', default: null })
  currency?: string;

  @Column('int8', {
    name: 'amount',
    default: 0,
    nullable: true,
  })
  amount: number;

  @Column({ type: 'enum', name: 'payment_status', enum: PaymentStatus, default: PaymentStatus.INITIALIZED })
  status: PaymentStatus;

  @Column('jsonb', { name: 'payment_request', nullable: true })
  input?: any; // TODO: Define the type

  @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
  createdDate?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
  modifiedDate?: Date;

  constructor(entity: DeepPartial<Payment>) {
    Object.assign(this, entity);
  }
}
