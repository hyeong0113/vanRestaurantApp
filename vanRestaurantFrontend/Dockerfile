FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build --prod

ENV REACT_APP_USERNAME=juneKwak
ENV REACT_APP_PASSWORD=qwe123
ENV REACT_APP_API_URL=https://nearby-mlbu.onrender.com
ENV REACT_APP_GOOGLE_MAP_API_KEY=AIzaSyCJIXILlzJej95f-EotXQTvre7iLq3t8cE
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_ID=1020319852889-n8m5470c345pqrjgroo3aasdmjglkqts.apps.googleusercontent.com
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET=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
ENV REACT_APP_GOOGLE_OAUTH_ENDPOINT=http://localhost:3000
ENV REACT_APP_GOOGLE_OAUTH_REDIRECT_URL=http://localhost:3000/api/sessions/oauth/google

EXPOSE 3001

CMD ["npm", "start"]