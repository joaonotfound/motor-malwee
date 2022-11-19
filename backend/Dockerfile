FROM node:19-alpine

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install
COPY ./src ./src

RUN npm run build
RUN rm -rf src

CMD ["npm", "run", "start:nobuild"]