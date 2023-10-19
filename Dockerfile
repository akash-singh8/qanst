FROM node:18.18-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY . .

# The problem with this steps is the we are migrating at build step, not before Docker container is started 
# RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]