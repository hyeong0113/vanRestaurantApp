FROM node:14-alpine3.13

WORKDIR /vanRestaurantApp/vanRestaurantFrontend

COPY package.json /vanRestaurantApp/vanRestaurantFrontend
COPY package-lock.json /vanRestaurantApp/vanRestaurantFrontend

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm install --production --verbose

COPY . /vanRestaurantApp/vanRestaurantFrontend

ENV NODE_ENV=production
ENV REACT_APP_USERNAME=juneKwak
ENV REACT_APP_PASSWORD=qwe123
ENV REACT_APP_API_URL=http://localhost:80
ENV REACT_APP_GOOGLE_MAP_API_KEY=AIzaSyCJIXILlzJej95f-EotXQTvre7iLq3t8cE
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_ID=1020319852889-n8m5470c345pqrjgroo3aasdmjglkqts.apps.googleusercontent.com
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET=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
ENV REACT_APP_GOOGLE_OAUTH_ENDPOINT=http://localhost:3000
ENV REACT_APP_GOOGLE_OAUTH_REDIRECT_URL=http://localhost:3000/api/sessions/oauth/google

EXPOSE 5000

CMD ["npm", "start"]