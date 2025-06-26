FROM node:latest
COPY . .
RUN npm install
RUN npm install -D vite
EXPOSE 5173
CMD [ "npx vite" ]