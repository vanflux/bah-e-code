FROM node:18-alpine as base
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps apps
RUN npm ci

FROM base as api
WORKDIR /app/apps/backend
RUN npm run build
EXPOSE 4000
HEALTHCHECK --timeout=10s CMD wget -q -O - http://localhost:4000/v1/status/db | grep -w "OK"
CMD [ "node", "dist/main.js" ]

FROM base as web_build
WORKDIR /app/apps/frontend
ENV API_BASE_URL https://api-bc.vanflux.dev
RUN npm run build

FROM nginx:alpine as web
COPY apps/frontend/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=web_build /app/apps/frontend/dist .

FROM base as landing_build
WORKDIR /app/apps/landing
RUN npm run build

FROM nginx:alpine as landing
COPY apps/landing/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=landing_build /app/apps/landing/dist .
