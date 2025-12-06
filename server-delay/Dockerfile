FROM node@sha256:7478f3725ef76ce6ba257a6818ea43c5eb7eb5bd424f0c3df3a80ff77203305e

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
