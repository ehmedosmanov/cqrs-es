import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateEventTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'eventType',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'aggregateId',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'payload',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'events',
      new TableIndex({
        name: 'IDX_EVENTS_AGGREGATE_ID',
        columnNames: ['aggregateId'],
      }),
    );

    await queryRunner.createIndex(
      'events',
      new TableIndex({
        name: 'IDX_EVENTS_CREATED_AT',
        columnNames: ['createdAt'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('events', 'IDX_EVENTS_CREATED_AT');
    await queryRunner.dropIndex('events', 'IDX_EVENTS_AGGREGATE_ID');
    await queryRunner.dropTable('events');
  }
}
