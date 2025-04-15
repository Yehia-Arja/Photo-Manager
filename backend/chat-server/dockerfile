FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev && npm audit fix || true

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
