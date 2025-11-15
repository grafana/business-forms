FROM node@sha256:a84dedcbbcf651db49178dd876bad1ea63bc6770891337a05246991bceca55a7

## Create app directory
WORKDIR /app

## Copy Server
COPY server-delay.ts .

## Add packages
RUN npm install ts-node

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

EXPOSE 5002

CMD /wait && node --no-warnings=ExperimentalWarning --loader ts-node/esm server-delay.ts
