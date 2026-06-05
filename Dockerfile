FROM node:18-alpine AS build_image
RUN apk add --no-cache nodejs npm
WORKDIR /ms-webserver
COPY ["package.json", "./"]
RUN npm install
COPY . .
RUN npm run build 

FROM node:18-alpine
WORKDIR /app
COPY --from=build_image /ms-webserver /app/
EXPOSE 8087
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]