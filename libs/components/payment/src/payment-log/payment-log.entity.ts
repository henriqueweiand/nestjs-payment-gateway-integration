import { Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Payment } from '../payment.entity';
import { PaymentLogStatus } from './payment_log_status.enum';

@Entity()
export class PaymentLog {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @ManyToOne(() => Payment, payment => payment.paymentLog, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;

    @Column({ name: 'payment_id', nullable: true })
    paymentId: string;

    @Column('jsonb', { name: 'payment_request', nullable: true })
    input: any; // TODO: Define the type

    @Column('jsonb', { name: 'payment_response', nullable: true })
    result: any; // TODO: Define the type

    @Column({ type: 'enum', name: 'payment_status', enum: PaymentLogStatus, default: PaymentLogStatus.PENDING })
    status: PaymentLogStatus;

    @CreateDateColumn({ type: 'timestamptz', name: 'create_dtm' })
    createdDate?: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'modify_dtm' })
    modifiedDate?: Date;

    @Column('int8', {
        name: 'amount',
        default: 0,
        nullable: true,
    })
    amount: number;

    constructor(entity: DeepPartial<PaymentLog>) {
        Object.assign(this, entity);
    }
}
