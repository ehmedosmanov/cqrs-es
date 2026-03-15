import { AppDataSource } from '../database/data-source';
import { EventEntity } from '../database/entities/event.entity';

export class EventStoreService {
  private eventRepo = AppDataSource.getRepository(EventEntity);

  async save(event: any) {
    await this.eventRepo.save({
      eventType: event.eventType,
      aggregateId: event.orderId,
      payload: event,
    });
    console.log(`Event saved: ${event.eventType}`);
  }

  async getEvents(orderId: string) {
    const events = await this.eventRepo.find({
      where: { aggregateId: orderId },
      order: { createdAt: 'ASC' },
    });
    return events.map((e) => e.payload);
  }

  async getAllEvents() {
    const events = await this.eventRepo.find({ order: { createdAt: 'ASC' } });
    return events.map((e) => e.payload);
  }
}
