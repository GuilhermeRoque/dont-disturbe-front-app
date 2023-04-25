
# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets
# docker build -t react-nginx .
# docker run --rm -it -p 8080:80 react-nginx

# Name the node stage "builder"
FROM node:14
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .

# install node modules and build assets
RUN npm ci 
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-n"]