#!/bin/bash
# If running this from a macOS, you will need pkgconfig
#  brew install pkgconfig
# <release> <dest_folder>
set -euo pipefail

build_folder=$2/build/$1
curr_dirname=$(dirname "$0")

. $curr_dirname/utils/gsort.sh

mkdir -p $build_folder
mkdir -p $2/source

FORCE_REBUILD=${FORCE_REBUILD:-}
FORCE_REBUILD_LIBCURL=${FORCE_REBUILD_LIBCURL:-}

# @TODO We are explicitly checking the static lib
if [[ -f $build_folder/lib/libcurl.a ]] && [[ -z $FORCE_REBUILD || $FORCE_REBUILD != "true" ]] && [[ -z $FORCE_REBUILD_LIBCURL || $FORCE_REBUILD_LIBCURL != "true" ]]; then
  echo "Skipping rebuild of libcurl because lib file already exists"
  # exit 0
fi

version_with_dashes=$(echo $1 | sed 's/\./_/g')

echo "Preparing release for libcurl $1"

# Libs build folders
LIBIDN2_BUILD_FOLDER=${LIBIDN2_BUILD_FOLDER:-}
LIBUNISTRING_BUILD_FOLDER=${LIBUNISTRING_BUILD_FOLDER:-}
KERBEROS_BUILD_FOLDER=${KERBEROS_BUILD_FOLDER:-}
HEIMDAL_BUILD_FOLDER=${HEIMDAL_BUILD_FOLDER:-}
OPENLDAP_BUILD_FOLDER=${OPENLDAP_BUILD_FOLDER:-}
LIBSSH2_BUILD_FOLDER=${LIBSSH2_BUILD_FOLDER:-}
NGHTTP2_BUILD_FOLDER=${NGHTTP2_BUILD_FOLDER:-}
OPENSSL_BUILD_FOLDER=${OPENSSL_BUILD_FOLDER:-}
CARES_BUILD_FOLDER=${CARES_BUILD_FOLDER:-}
BROTLI_BUILD_FOLDER=${BROTLI_BUILD_FOLDER:-}
ZLIB_BUILD_FOLDER=${ZLIB_BUILD_FOLDER:-}

LIBS=${LIBS:-}
CPPFLAGS=${CPPFLAGS:-}
LDFLAGS=${LDFLAGS:-}
libcurl_args=()

# libcurl only started having proper releases only with 7.54
# Up to 7.53.1 only source tarballs were available, so the url
#  needs to be changed to something like: https://github.com/curl/curl/archive/curl-7_53_1.tar.gz
# And as it is just a source tarball, we must also create the ./configure script
is_less_than_7_54_0=0
(printf '%s\n%s' "7.54.0" "$1" | $gsort -CV) || is_less_than_7_54_0=$?

echo "Using source"
$curr_dirname/download-and-unpack.sh \
      https://github.com/lwthiker/curl-impersonate/archive/refs/tags/v0.6.1.tar.gz \
      $2

mv $2/curl-impersonate-0.6.1 $2/source/$1
cd $2/source/$1

mkdir build && cd build
../configure
# Build and install the Chrome version
make chrome-build
sudo make chrome-install

# Debug
    # --enable-debug \

# Release - Static
#./configure \
#    --enable-debug \
#    --without-nss \
#    --without-libpsl \
#    --without-librtmp \
#    --without-libidn \
#    --disable-manual \
#    --disable-shared \
#    --prefix=$build_folder \
#    "${libcurl_args[@]}" \
#    "${@:3}"
    
# Release - Both
# make && make install
