FROM mariadb:10.4.8

COPY ./Environment/lp_cm_mariadb/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN apt update && apt install unzip

ADD ./Database /Database
RUN chmod -R 777 /Database

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]
