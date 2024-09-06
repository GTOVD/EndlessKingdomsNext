FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

# Change the CMD to run the dev server
CMD ["npm", "run", "dev"]