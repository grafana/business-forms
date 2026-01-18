FROM node@sha256:a2f09f3ab9217c692a4e192ea272866ae43b59fabda1209101502bf40e0b9768

## Create app directory
WORKDIR /app

## Copy Server
COPY server.ts .

## Add packages
RUN npm install ts-node pg multiparty

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

EXPOSE 3001

CMD /wait && node --no-warnings=ExperimentalWarning --loader ts-node/esm server.ts
