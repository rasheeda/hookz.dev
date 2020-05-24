FROM mhart/alpine-node
RUN mkdir -p /usr/src/app/hookz/client
WORKDIR /usr/src/app/hookz/client
COPY package*.json /usr/src/app/hookz/client/
RUN npm install
COPY . /usr/src/app/hookz/client/
EXPOSE 3000
CMD [ "npm", "start" ]