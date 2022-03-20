# @wishlez/core

## Development

Create a `.env` file with following values to start developing.

```ini
DATABASE_URL = "mysql://<username>:<password>@<host>:<port>/<database>"
JWT_SECRET = <SomeSaltValue>
NEXTAUTH_URL = http://localhost:3000
```

### Create tables in mysql

```shell
npm run prisma:migrate
```

### Create initial data

```shell
npm run prisma:seed
```

### Start server

```shell
npm run dev
```

And navigate to [http://localhost:3000](http://localhost:3000)
