FROM node:18-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# default nginx config serves static files
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
