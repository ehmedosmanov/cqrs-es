# E-Commerce CQRS & Event Sourcing

A demonstration project showcasing **CQRS (Command Query Responsibility Segregation)** and **Event Sourcing** architectural patterns in a simple e-commerce order management system.

## 🎯 Purpose

This project was built for educational purposes to demonstrate:
- How CQRS separates write and read operations
- How Event Sourcing preserves complete audit trails
- How these patterns work together in a real application

## 🏗️ Architecture

### CQRS Pattern
- **Commands** (Write Side): Create, Confirm, Ship orders
- **Queries** (Read Side): Get order details, list orders
- **Separation**: Different models optimized for writes vs reads

### Event Sourcing Pattern
- **Event Store**: All events stored permanently in `events` table
- **Read Model**: Current state in `order_view` table
- **Event Replay**: Can rebuild state from event history
- **Complete Audit Trail**: Know who did what and when

## 🛠️ Tech Stack

- **Backend**: TypeScript, Express.js
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **API Testing**: Postman

## 📁 Project Structure
```
src/
├── orders/
│   ├── commands/          # Write operations (CQRS)
│   ├── queries/           # Read operations (CQRS)
│   ├── events/            # Domain events (Event Sourcing)
│   ├── order.aggregate.ts # Domain logic
│   ├── event-store.service.ts  # Event Store
│   └── read-model.service.ts   # Read Model
├── database/
│   ├── entities/
│   │   ├── event.entity.ts      # Events table
│   │   └── order-view.entity.ts # Read model table
│   └── migrations/        # Database migrations
└── server.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ehmedosmanov/cqrs-es.git
cd cqrs-es
```

2. **Install dependencies**
```bash
npm install
```

3. **Start PostgreSQL with Docker**
```bash
npm run docker:up
```

4. **Run database migrations**
```bash
npm run migration:run
```

5. **Start the server**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Commands (Write Side)
- `POST /api/orders` - Create order
- `POST /api/orders/:id/confirm` - Confirm order
- `POST /api/orders/:id/ship` - Ship order

### Queries (Read Side)
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get all orders
- `GET /api/orders?status=PENDING` - Filter by status

### Event Sourcing
- `GET /api/orders/:id/history` - Get complete event history

## 🧪 Testing

### Using cURL
```bash
# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-001",
    "customerName": "Ahmad Osmanov",
    "items": [{"product": "Laptop", "quantity": 1, "price": 999}]
  }'

# Get order
curl http://localhost:3000/api/orders/ORD-001

# Confirm order
curl -X POST http://localhost:3000/api/orders/ORD-001/confirm

# Ship order
curl -X POST http://localhost:3000/api/orders/ORD-001/ship \
  -H "Content-Type: application/json" \
  -d '{"trackingNumber": "TRACK-123"}'

# View history
curl http://localhost:3000/api/orders/ORD-001/history
```

### Using Postman

Import the Postman collection from the repository and run the "Demo Scenario" folder for a complete flow demonstration.

## 🗄️ Database Schema

### Events Table (Event Store)
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  eventType VARCHAR(255),
  aggregateId VARCHAR(255),
  payload JSONB,
  createdAt TIMESTAMP
);
```

### Order View Table (Read Model)
```sql
CREATE TABLE order_view (
  orderId VARCHAR(255) PRIMARY KEY,
  customerName VARCHAR(255),
  totalAmount DECIMAL(10,2),
  status VARCHAR(50),
  items JSONB,
  trackingNumber VARCHAR(255),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## 🎓 Key Concepts Demonstrated

### CQRS Benefits
✅ **Performance** - Optimized reads and writes  
✅ **Scalability** - Scale reads independently  
✅ **Flexibility** - Different models for different purposes  

### Event Sourcing Benefits
✅ **Complete Audit Trail** - Every change recorded  
✅ **Time Travel** - Reconstruct state at any point  
✅ **Debugging** - See exact sequence of events  
✅ **Compliance** - Meet regulatory requirements  

## 📚 Learning Resources

- [CQRS Pattern - Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Event Sourcing - Martin Fowler](https://martinfowler.com/eaaDev/EventSourcing.html)
- [TypeORM Documentation](https://typeorm.io/)

## 🤝 Contributing

This is an educational project. Feel free to fork and experiment!

## 📄 License

MIT License - feel free to use this for learning purposes

```

---

## 🏷️ GitHub Topics/Tags

Add these tags to your repository:
```
cqrs
event-sourcing
typescript
nodejs
express
typeorm
postgresql
docker
microservices
ddd
domain-driven-design
event-store
architecture
design-patterns
educational
```

---

## 📋 GitHub About Section (Short)
```
Educational project demonstrating CQRS & Event Sourcing patterns
TypeScript • Express • TypeORM • PostgreSQL • Docker
Complete with migrations, Postman collection, and documentation
