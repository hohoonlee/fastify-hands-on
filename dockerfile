FROM node:16
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY src/ ./src/

RUN yarn install --frozen-lockfile
RUN yarn global add pm2
RUN pm2 install pm2-logrotate

ENV NODE_ENV=development
ENV PORT=8080

CMD ["pm2-runtime", "start", "./src/server.js", "-i", "-1"]
