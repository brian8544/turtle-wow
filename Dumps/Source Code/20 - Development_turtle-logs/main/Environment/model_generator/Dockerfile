FROM archlinux:latest

RUN pacman -Sy --noconfirm
RUN pacman -S --noconfirm python python-pip make git fakeroot binutils alsa-lib gtk3 libcups libxss libxtst nss xdg-utils

RUN useradd -ms /bin/bash generator

USER generator

WORKDIR /home/generator

RUN git clone https://aur.archlinux.org/chromedriver.git
RUN git clone https://aur.archlinux.org/google-chrome.git

RUN cd chromedriver && \
    makepkg && \
    cd ../

RUN cd google-chrome && \
    makepkg && \
    cd ../

USER root

RUN cd chromedriver && \
    pacman -U --noconfirm chromedriver-*.pkg.tar.xz && \
    cd ..

RUN cd google-chrome && \
    pacman -U --noconfirm google-chrome-*.pkg.tar.xz && \
    cd ..

USER generator

COPY ./ModelViewer/model_generator.py ./
ADD ./ModelViewer/viewer ./

RUN pip install selenium
RUN pip install flask

CMD ["python", "./model_generator.py"]