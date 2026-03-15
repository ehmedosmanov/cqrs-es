import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventType: string;

  @Column()
  aggregateId: string;

  @Column('jsonb')
  payload: any;

  @CreateDateColumn()
  createdAt: Date;
}
