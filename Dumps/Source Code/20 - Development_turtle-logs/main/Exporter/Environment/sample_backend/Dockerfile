FROM archlinux:latest

RUN pacman -Sy --noconfirm
RUN pacman -S --noconfirm rustup gcc cmake openssl pkgconf
RUN rustup toolchain install nightly
RUN rustup default nightly

ADD ./Sample_endpoint /Backend
WORKDIR /Backend

ENV RUST_ENV=production

CMD ["cargo", "run", "--release"]