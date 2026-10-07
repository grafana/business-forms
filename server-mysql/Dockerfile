FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1

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
