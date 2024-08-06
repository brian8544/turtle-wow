FROM archlinux:latest

RUN pacman -Sy --noconfirm
RUN pacman -S --noconfirm rustup gcc cmake openssl pkgconf zeromq
RUN rustup toolchain install nightly
RUN rustup default nightly

ADD ./Backend /Backend
WORKDIR /Backend

ENV RUST_ENV=production

CMD ["cargo", "run", "--release"]