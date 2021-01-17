FROM arm64v8/node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm i

EXPOSE 8080

CMD ["node", "app.js"]