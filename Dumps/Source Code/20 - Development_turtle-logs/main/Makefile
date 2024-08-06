## Setup all variables
RUSTUP = rustup
NIGHTLY_TOOLCHAIN = nightly
DOCKER = docker
CARGO = cargo

INSTALLED_TOOLCHAINS = $(shell $(RUSTUP) toolchain list)
INSTALLED_COMPONENTS = $(shell $(RUSTUP) component list --installed --toolchain $(NIGHTLY_TOOLCHAIN))
INSTALLED_NIGHTLY_COMPONENTS = $(shell $(RUSTUP) component list --installed --toolchain $(NIGHTLY_TOOLCHAIN))

## Dev environment
install_rust_nightly:
ifeq (,$(findstring $(NIGHTLY_TOOLCHAIN),$(INSTALLED_TOOLCHAINS)))
	$(RUSTUP) install $(NIGHTLY_TOOLCHAIN)
endif

install_clippy: install_rust_nightly
ifeq (,$(findstring clippy,$(INSTALLED_COMPONENTS)))
	$(RUSTUP) component add clippy --toolchain $(NIGHTLY_TOOLCHAIN)
endif

install_rustfmt: install_rust_nightly
ifeq (,$(findstring rustfmt,$(INSTALLED_NIGHTLY_COMPONENTS)))
	$(RUSTUP) component add rustfmt --toolchain $(NIGHTLY_TOOLCHAIN)
endif

## Initial setup

setup: install_rust_nightly install_clippy install_rustfmt

## Development tasks

all: fmt build clippy test

build: install_rust_nightly
	$(CARGO) build --workspace --all-targets $(BUILD_ARGS)

clippy: install_clippy
	$(CARGO) clippy --all-targets -- -D warnings

test:
	$(DOCKER) build --tag rpll_backend_test_db ./Database/
	$(CARGO) test --workspace --all-targets --no-fail-fast

fmt: install_rustfmt
	$(CARGO) fmt -- --files-with-diff

coverage_test: install_rust_nightly
	$(DOCKER) build --tag rpll_backend_test_db ./Database/
	RUSTFLAGS="-Zprofile -Ccodegen-units=1 -Copt-level=0 -Clink-dead-code -Coverflow-checks=off -Zpanic_abort_tests" \
	CARGO_INCREMENTAL=0 \
	RUSTDOCFLAGS="-Zprofile -Ccodegen-units=1 -Copt-level=0 -Clink-dead-code -Coverflow-checks=off -Zpanic_abort_tests" \
	$(CARGO) test --workspace --all-targets --no-fail-fast $(ARGS)

coverage_build:
	$(CARGO) install grcov || true
	~/.cargo/bin/grcov ./target/debug/ -s . -t lcov --llvm --branch --ignore-not-existing --filter "covered" \
	  --ignore "/*" --ignore "*/tests/*" --ignore "*/dto/*" --ignore "*/domain_value/*" --ignore "*/main.rs" --ignore "*/benches/*" \
	  --excl-br-line "#\\[\\w+(\\([\\w\",/\\s=<>]+\\))?\\]|pub\\s\\w+:[\\w<,\\s>]+," \
	  --excl-line "#\\[\\w+(\\([\\w\",/\\s=<>]+\\))?\\]" -o lcov.info

coverage_genhtml:
	genhtml -o ./target/debug/coverage/ --branch-coverage --show-details --highlight --ignore-errors source --legend ./lcov.info && rm ./lcov.info

coverage: coverage_test coverage_build coverage_genhtml

tarpaulin:
	$(CARGO) install cargo-tarpaulin || true
	$(DOCKER) build --tag rpll_backend_test_db ./Database/
	cargo tarpaulin -v --timeout 600