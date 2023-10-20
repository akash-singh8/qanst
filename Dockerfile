FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json .

RUN npm install

COPY . .

# RUN npx prisma migrate dev => problem: we are migrating at build step, not before Docker container is started 

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]