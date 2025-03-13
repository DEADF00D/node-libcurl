#!/bin/bash

curr_dirname=$(dirname "$0")

mkdir -p deps/output
cd deps/curl-impersonate

rm -rf build
mkdir build && cd build
../configure --prefix `pwd`/../../output
# Build and install the Chrome version
make chrome-build
make chrome-install

cp -R curl-8.1.1/include/ `pwd`/../../output/include
