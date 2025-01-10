# NestJS-Flights

NestJS Flights is a project that uses a third-party provider to get the flight data and after storing and caching, the API provides the data through GraphQL

### How to run

1. Fill the env file out;
2. Install the dependencies;
3. Run docker-composer, `docker-compose up -d`;
4. Run project `yarn start:dev`

### Technologies

- NestJS
- Cache
- GraphQL
- Social Login

### Important

- When running docker, the project will restore countries and airports automatically.
- The migrations will be sync with the database restored.
