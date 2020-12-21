FROM node:12
WORKDIR /app

COPY package.json ./
RUN npm install

EXPOSE 4200
CMD ["npm", "run", "dev"]