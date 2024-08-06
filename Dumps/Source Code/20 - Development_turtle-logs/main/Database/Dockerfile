# Copied from https://github.com/lindycoder/prepopulated-mysql-container-example
# Modified to fit own purposes
FROM mariadb:10.7.4 as builder

# That file does the DB initialization but also runs mysql daemon, by removing the last line it will only init
RUN ["sed", "-i", "s/exec \"$@\"/echo \"not running $@\"/", "/usr/local/bin/docker-entrypoint.sh"]

# needed for intialization
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_USER=mysql
ENV MYSQL_ROOT_PASSWORD=vagrant

COPY patches/*.sql.gz /docker-entrypoint-initdb.d/
COPY test/*.sql.gz /docker-entrypoint-initdb.d/

# Need to change the datadir to something else that /var/lib/mysql because the parent docker file defines it as a volume.
# https://docs.docker.com/engine/reference/builder/#volume :
#       Changing the volume from within the Dockerfile: If any build steps change the data within the volume after
#       it has been declared, those changes will be discarded.
RUN ["/usr/local/bin/docker-entrypoint.sh", "mysqld", "--datadir", "/initialized-db", "--aria-log-dir-path", "/initialized-db"]

FROM mariadb:10.7.4

COPY --from=builder /initialized-db /var/lib/mysql