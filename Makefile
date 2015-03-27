BIN   = ./node_modules/.bin
PATH := $(BIN):$(PATH)
SRC   = $(wildcard src/*.js)
LIB   = $(SRC:src/%.js=lib/%.js)

lib: $(LIB)
lib/%.js: src/%.js
	@mkdir -p $(@D)
	$(BIN)/babel $< -o $@

clean:
	@rm -rf ./lib

build: test clean lib

dev:
	@ node ./example/index.js

test:
	@ NODE_PATH='./test' $(BIN)/mocha \
		--require mocha-clean           \
		--compilers js:babel/register   \
		./test/*.test.js

.PHONY: install test dev