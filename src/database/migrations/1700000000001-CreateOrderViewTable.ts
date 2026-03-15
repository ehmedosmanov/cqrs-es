import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateOrderViewTable1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_view',
        columns: [
          {
            name: 'orderId',
            type: 'varchar',
            length: '255',
            isPrimary: true,
          },
          {
            name: 'customerName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'totalAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'items',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'trackingNumber',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'order_view',
      new TableIndex({
        name: 'IDX_ORDER_VIEW_STATUS',
        columnNames: ['status'],
      }),
    );

    await queryRunner.createIndex(
      'order_view',
      new TableIndex({
        name: 'IDX_ORDER_VIEW_CREATED_AT',
        columnNames: ['createdAt'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('order_view', 'IDX_ORDER_VIEW_CREATED_AT');
    await queryRunner.dropIndex('order_view', 'IDX_ORDER_VIEW_STATUS');
    await queryRunner.dropTable('order_view');
  }
}