FROM node:14.15.4-alpine3.12

USER node

WORKDIR /home/node/app

COPY . .

EXPOSE 3333

ENTRYPOINT [".docker/entrypoint.sh"]
