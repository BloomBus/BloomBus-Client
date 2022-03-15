# Stage 1 - the build process
FROM node:16.14.0 as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN REACT_APP_FIREBASE_API_KEY=AIzaSyBZqS6DYdrw0ryNXF1KgdPe22wVXYwq2b8 REACT_APP_MAPSTYLE_URL=https://tileservergl.anhalt.xyz/styles/tweaked-bright/style.json npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
