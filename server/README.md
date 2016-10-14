## Server Setup

1. Install latest version of node, npm and yarn
2. Do yarn install
3. create a db and change db settings in config.js
4. Run the migrations using the following command
```
node_modules/.bin/knex migrate:latest
```
5. start server using the following command
```
DEBUG=homeautomation:* npm start
```
