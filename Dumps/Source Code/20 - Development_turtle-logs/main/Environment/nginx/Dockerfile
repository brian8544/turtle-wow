FROM ranadeeppolavarapu/nginx-http3

RUN mkdir -p /etc/nginx/cert
RUN mkdir -p /var/www/html/model_viewer

COPY ./Environment/nginx/nginx.conf /etc/nginx/
copy ./Environment/nginx/dhparam.pem /etc/nginx/cert/
copy ./Environment/nginx/jaylapp.crt /etc/nginx/cert/
copy ./Environment/nginx/jaylapp.key.pem /etc/nginx/cert/

RUN chmod -R 777 /var/www/html