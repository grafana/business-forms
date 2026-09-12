FROM node:24-alpine@sha256:50c8e8ca1d27439048670df5883f32d57cf81cff6233222c893fd0d9884cbd81

## Create app directory
WORKDIR /app

## Copy Server
COPY server-delay.ts .

## Add packages
RUN npm install ts-node

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.1/wait /wait
RUN chmod +x /wait

EXPOSE 5002

CMD /wait && node --no-warnings=ExperimentalWarning --loader ts-node/esm server-delay.ts
