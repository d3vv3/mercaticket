# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# add app
COPY . .

# install app dependencies
RUN yarn install
RUN yarn run build

EXPOSE 3000

# start
CMD ["yarn", "run",  "start"]
