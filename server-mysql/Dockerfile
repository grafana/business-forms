FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f

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
