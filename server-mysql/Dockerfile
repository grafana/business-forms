FROM node:24-alpine@sha256:01743339035a5c3c11a373cd7c83aeab6ed1457b55da6a69e014a95ac4e4700b

## Create app directory
WORKDIR /home/node/app

## Copy Server
COPY server.ts .

## Add Mysql package
RUN yarn add mysql@2.18.1 && \
    chown -R node:node /home/node/app

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.1/wait /wait
RUN chmod +x /wait

## Set the user to use when running this image
USER node
WORKDIR /home/node/app

EXPOSE 3001

CMD /wait && node server.ts
