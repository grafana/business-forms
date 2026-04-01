FROM node:24-alpine

## Create app directory
WORKDIR /app

## Copy Server
COPY server.ts .

## Add packages
RUN npm install ts-node pg multiparty

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.1/wait /wait
RUN chmod +x /wait

EXPOSE 3001

CMD /wait && node --no-warnings=ExperimentalWarning --loader ts-node/esm server.ts
