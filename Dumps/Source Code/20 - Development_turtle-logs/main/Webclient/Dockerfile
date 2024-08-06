FROM nginx:1.23

RUN apt update && apt install -y npm unzip

RUN mkdir /Webclient
COPY ./src /Webclient/src
COPY ./tools /Webclient/tools
COPY ./.browserslistrc /Webclient/.browserslistrc
COPY ./.editorconfig /Webclient/.editorconfig
COPY ./angular.json /Webclient/angular.json
COPY ./proxy.conf.json /Webclient/proxy.conf.json
COPY ./configuration.sh /Webclient/configuration.sh
COPY ./package.json /Webclient/package.json
COPY ./package-lock.json /Webclient/package-lock.json
COPY ./tsconfig.json /Webclient/tsconfig.json
COPY ./tsconfig.app.json /Webclient/tsconfig.app.json
COPY ./tsconfig.spec.json /Webclient/tsconfig.spec.json
COPY ./tsconfig.worker.json /Webclient/tsconfig.worker.json
COPY ./tslint.json /Webclient/tslint.json

WORKDIR /Webclient
RUN npm ci
RUN npm run build

RUN mkdir -p /var/www
RUN cp -r dist/Webclient/* /var/www/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
