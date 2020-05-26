FROM mhart/alpine-node
RUN mkdir -p /usr/src/app/hookz/api
WORKDIR /usr/src/app/hookz/api
COPY package*.json /usr/src/app/hookz/api/
RUN npm install
RUN npm install -g nodemon
COPY . /usr/src/app/hookz/api/
EXPOSE 5000
CMD [ "npm", "start" ]