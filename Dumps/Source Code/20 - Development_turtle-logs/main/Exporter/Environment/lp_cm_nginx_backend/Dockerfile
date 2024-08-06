FROM archlinux:latest as builder

RUN pacman -Sy --noconfirm
RUN pacman -S --noconfirm npm
RUN npm i -g @angular/cli

ADD ./Webclient /Webclient

WORKDIR /Webclient

RUN npm i
RUN ng build --prod --base-href /rpll/ --rebase-root-relative-css-urls=true
RUN sed -i 's/href="styles/href="\/rpll\/styles/g' dist/Webclient/index.html
RUN sed -i 's/href="favicon/href="\/rpll\/favicon/g' dist/Webclient/index.html
RUN sed -i 's/script src="/script src="\/rpll\//g' dist/Webclient/index.html

FROM nginx:stable

RUN mkdir -p /var/www/html/rpll

COPY --from=builder /Webclient/dist/Webclient/ /var/www/html/rpll/

RUN chmod -R 777 /var/www/html