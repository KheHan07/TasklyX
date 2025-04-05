# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod  # or "npm run build -- --configuration production" if Angular 15+

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy from "browser" subfolder
COPY --from=build /usr/src/app/dist/task-manager-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
