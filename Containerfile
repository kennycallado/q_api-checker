# FROM node:alpine as build

# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

FROM node:alpine as runtime

ENV NODE_ENV="production"
ENV PORT=3000

RUN mkdir -p /app/SCRIPTS
COPY ./dist /app/dist

# COPY ./SCRIPTS /app/SCRIPTS
# COPY --from=build /app/package.json /app/package.json
# COPY --from=build /app/dist /app/dist
# COPY ./package.json /app/package.json

WORKDIR /app

EXPOSE 3000
CMD ["node", "dist/server.js"]
