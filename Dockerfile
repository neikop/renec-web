# syntax = docker/dockerfile:1.3
FROM harbor.airdata.site/common/node:16-alpine3.15 as build-stage
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.npm npm ci
RUN npm run build

# production stage
FROM harbor.airdata.site/common/nginx:v1.0.0 as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
