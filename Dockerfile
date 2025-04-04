FROM node:20-slim
WORKDIR /app
COPY ./server/package*.json ./server/
RUN cd ./server/ && npm install
COPY . .
WORKDIR /app/server
EXPOSE 3000
CMD ["npm", "run", "start"]