FROM node:14.18-alpine AS BUILD_IMAGE
RUN apk add --no-cache nodejs npm
WORKDIR /ms-webserver
COPY ["package.json", "./"]
RUN npm install
COPY . .
RUN npm run build 

FROM node:14.18-alpine
WORKDIR /app
COPY --from=BUILD_IMAGE /ms-webserver /app/
EXPOSE 8078
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]