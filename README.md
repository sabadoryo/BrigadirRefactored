Brigadir - Discord bot for Zavod server.

1) Git clone this repo. Node(14+) and npm(8+) required on your machine
2) After cloning the repo - 'npm install'
3) Add .env file to project directory (Ask for token in discord).
4) Setup local database, look for /prisma/schema.prisma for info, add DB URL to .env (see .env.example for reference)
5) Run migrations:
  'npx prisma migrate dev --name init'
4) Run 'node index.js'
