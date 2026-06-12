FROM node:24-alpine@sha256:fb71d01345f11b708a3553c66e7c74074f2d506400ea81973343d915cb64eef0

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
