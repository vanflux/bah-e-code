FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/backend apps/backend
RUN npm ci
WORKDIR /app/apps/backend
RUN npm run build
EXPOSE 4000
HEALTHCHECK --timeout=10s CMD wget -q -O - http://localhost:4000/v1/status/db | grep -w "OK"
CMD [ "node", "dist/main.js" ]
