#!/bin/bash

curr_dirname=$(dirname "$0")

rm -rf deps/libcurlimpersonate/

$curr_dirname/ci/download-and-unpack.sh \
      https://github.com/lwthiker/curl-impersonate/archive/refs/tags/v0.6.1.tar.gz \
      deps/libcurlimpersonate

mkdir -p deps/libcurlimpersonate/output
cd deps/libcurlimpersonate/curl-impersonate-0.6.1

mkdir build && cd build
../configure --prefix `pwd`/../../../output
# Build and install the Chrome version
make chrome-build
make chrome-install

curl_chrome116 --version
curl-impersonate-chrome-config --version
curl-impersonate-chrome-config --libs
curl-impersonate-chrome-config --static-libs
curl-impersonate-chrome-config --prefix
curl-impersonate-chrome-config --cflags

cd ../../../..
ls
node-pre-gyp install --fallback-to-build
