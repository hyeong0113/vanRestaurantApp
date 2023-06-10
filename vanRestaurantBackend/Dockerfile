FROM node

WORKDIR /vanRestaurantBackend

COPY package.json /vanRestaurantBackend
COPY package-lock.json /vanRestaurantBackend

RUN npm install

COPY . /vanRestaurantBackend

ENV PORT=80
ENV API_KEY=AIzaSyCJIXILlzJej95f-EotXQTvre7iLq3t8cE
ENV MONGO_URL=mongodb+srv://hyeong0113:03010913tK^@nearby-cluster.88jrjsa.mongodb.net/?retryWrites=true&w=majority
ENV USERNAME=juneKwak
ENV PASSWORD=qwe123
ENV JWT_SECRET=oinwd123UIJWQD.qwdibjqw123fGEQWnvbw56Ganwondaechiqwfwq90onion123cexbveTYIwdqwq2123g45hrtghfgbs32e2eHGjkGE654785HGFY.gFUu721d21dsd
ENV COOKIE_SECRET=kqwijw32124wqrfqkldfJJEWKEKJ2341zvnzcnSKDSAL19461JSDHDJ2dnvkevnbwer629IQUncnendnw09112MASCSAzxcy452v57vdcdcsJWQJcvfbfghwef3123
ENV GEOMETRY=https://www.googleapis.com/geolocation/v1/geolocate
ENV NEARBY=https://maps.googleapis.com/maps/api/place/nearbysearch/json
ENV PLACE=https://maps.googleapis.com/maps/api/place/findplacefromtext/json
ENV DETAIL=https://maps.googleapis.com/maps/api/place/details/json
ENV GOOGLE_OAUTH_CLIENT_ID=1020319852889-n8m5470c345pqrjgroo3aasdmjglkqts.apps.googleusercontent.com
ENV GOOGLE_OAUTH_CLIENT_SECRET=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

EXPOSE 80

CMD ["npm", "run", "develop"]