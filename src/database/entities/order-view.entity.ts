import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('order_view')
export class OrderViewEntity {
  @PrimaryColumn()
  orderId: string;

  @Column()
  customerName: string;

  @Column('decimal')
  totalAmount: number;

  @Column()
  status: string;

  @Column('jsonb')
  items: any[];

  @Column({ nullable: true })
  trackingNumber?: string;

  @Column()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}