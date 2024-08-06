FROM rust:1.62

RUN rustup install nightly-2022-07-01
RUN rustup default nightly-2022-07-01

RUN mkdir /Backend
COPY ./src /Backend/src
COPY ./sub_crates /Backend/sub_crates
COPY ./Cargo.toml /Backend/Cargo.toml

WORKDIR /Backend
RUN cargo build --release

ENTRYPOINT ["/bin/bash", "-c", "sleep 5s && /Backend/target/release/backend"]