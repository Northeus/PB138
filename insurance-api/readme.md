# Insurance API

## Requirements

### Database
```
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:13-alpine
```

### SetUp
```
npm i
npm run migrate
npm run seed
```
