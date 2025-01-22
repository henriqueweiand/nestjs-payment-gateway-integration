# nestjs-payment-gateway-integration

This project is a NestJS-based payment gateway integration service. It provides a unified interface for processing payments through various payment processors such as Stripe, PayPal, and others. The service handles payment initialization, processing, and refunding, ensuring a seamless payment experience for users.

Frontend project: https://github.com/henriqueweiand/nextjs-payment-gateway-integration

### Features

- Support for multiple payment processors
- Payment initialization and processing
- Payment refunding
- Logging and error handling
- Extensible architecture for adding new payment processors

### How to run

1. Copy .env.example to .env and fill it out;
2. Install the dependencies;
3. Run docker-compose, `docker-compose up -d`;
4. Run migrations `yarn typeorm:run`;
5. Run project `yarn start:dev`.
