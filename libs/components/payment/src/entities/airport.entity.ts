import { Column, DeepPartial, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Airport {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ length: 255, name: 'airport_name', nullable: true })
    name?: string;

    constructor(entity: DeepPartial<Airport>) {
        Object.assign(this, entity);
    }
}
