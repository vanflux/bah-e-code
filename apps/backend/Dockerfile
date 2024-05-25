FROM node:16-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY nest-cli.json tsconfig*.json ./
COPY src src
COPY .sequelizerc .sequelizerc
RUN npm run build
EXPOSE 4000
HEALTHCHECK --timeout=10s CMD wget -q -O - --post-data='' http://localhost:4000/v1/status/db | grep -w "OK"
CMD [ "node", "dist/main.js" ]
