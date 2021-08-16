[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

If you have docker and docker-compose
```bash
$ docker-compose up -d
```

Otherwise

Go to `app.module.ts` and replace mongodb url to 'mongodb://localhost/<dbname>'

```bash
$ npm install
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

I ended up creating a whole user module with registration so if you want to add a user, u can use `/user` but i did not add user relation to the task object since the app was meant for 1 user.
