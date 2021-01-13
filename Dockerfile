FROM node:alpine


# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
WORKDIR /app
COPY ./ /app
RUN npm install

CMD ng serve --host 0.0.0.0
