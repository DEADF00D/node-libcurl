/**
 * Copyright (c) Jonathan Cardoso Machado. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @public
 */
export interface MultiOption {
    /**
     * deprecated
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_CHUNK_LENGTH_PENALTY_SIZE.html](https://curl.haxx.se/libcurl/c/CURLMOPT_CHUNK_LENGTH_PENALTY_SIZE.html)
     */
    readonly CHUNK_LENGTH_PENALTY_SIZE: 'CHUNK_LENGTH_PENALTY_SIZE';
    /**
     * deprecated
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_CONTENT_LENGTH_PENALTY_SIZE.html](https://curl.haxx.se/libcurl/c/CURLMOPT_CONTENT_LENGTH_PENALTY_SIZE.html)
     */
    readonly CONTENT_LENGTH_PENALTY_SIZE: 'CONTENT_LENGTH_PENALTY_SIZE';
    /**
     * Max concurrent streams for http2.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_CONCURRENT_STREAMS.html](https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_CONCURRENT_STREAMS.html)
     */
    readonly MAX_CONCURRENT_STREAMS: 'MAX_CONCURRENT_STREAMS';
    /**
     * Max number of connections to a single host.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_HOST_CONNECTIONS.html](https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_HOST_CONNECTIONS.html)
     */
    readonly MAX_HOST_CONNECTIONS: 'MAX_HOST_CONNECTIONS';
    /**
     * deprecated.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_PIPELINE_LENGTH.html](https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_PIPELINE_LENGTH.html)
     */
    readonly MAX_PIPELINE_LENGTH: 'MAX_PIPELINE_LENGTH';
    /**
     * Max simultaneously open connections.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_TOTAL_CONNECTIONS.html](https://curl.haxx.se/libcurl/c/CURLMOPT_MAX_TOTAL_CONNECTIONS.html)
     */
    readonly MAX_TOTAL_CONNECTIONS: 'MAX_TOTAL_CONNECTIONS';
    /**
     * Size of connection cache.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_MAXCONNECTS.html](https://curl.haxx.se/libcurl/c/CURLMOPT_MAXCONNECTS.html)
     */
    readonly MAXCONNECTS: 'MAXCONNECTS';
    /**
     * Enable HTTP multiplexing.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_PIPELINING.html](https://curl.haxx.se/libcurl/c/CURLMOPT_PIPELINING.html)
     */
    readonly PIPELINING: 'PIPELINING';
    /**
     * deprecated.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_PIPELINING_SERVER_BL.html](https://curl.haxx.se/libcurl/c/CURLMOPT_PIPELINING_SERVER_BL.html)
     */
    readonly PIPELINING_SERVER_BL: 'PIPELINING_SERVER_BL';
    /**
     * deprecated.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_PIPELINING_SITE_BL.html](https://curl.haxx.se/libcurl/c/CURLMOPT_PIPELINING_SITE_BL.html)
     */
    readonly PIPELINING_SITE_BL: 'PIPELINING_SITE_BL';
    /**
     * Pointer to pass to push callback.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_PUSHDATA.html](https://curl.haxx.se/libcurl/c/CURLMOPT_PUSHDATA.html)
     */
    readonly PUSHDATA: 'PUSHDATA';
    /**
     * Callback that approves or denies server pushes.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_PUSHFUNCTION.html](https://curl.haxx.se/libcurl/c/CURLMOPT_PUSHFUNCTION.html)
     */
    readonly PUSHFUNCTION: 'PUSHFUNCTION';
    /**
     * Custom pointer passed to the socket callback.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_SOCKETDATA.html](https://curl.haxx.se/libcurl/c/CURLMOPT_SOCKETDATA.html)
     */
    readonly SOCKETDATA: 'SOCKETDATA';
    /**
     * Callback informed about what to wait for.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_SOCKETFUNCTION.html](https://curl.haxx.se/libcurl/c/CURLMOPT_SOCKETFUNCTION.html)
     */
    readonly SOCKETFUNCTION: 'SOCKETFUNCTION';
    /**
     * Custom pointer to pass to timer callback.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_TIMERDATA.html](https://curl.haxx.se/libcurl/c/CURLMOPT_TIMERDATA.html)
     */
    readonly TIMERDATA: 'TIMERDATA';
    /**
     * Callback to receive timeout values.
     *
     * Official libcurl documentation: : [https://curl.haxx.se/libcurl/c/CURLMOPT_TIMERFUNCTION.html](https://curl.haxx.se/libcurl/c/CURLMOPT_TIMERFUNCTION.html)
     */
    readonly TIMERFUNCTION: 'TIMERFUNCTION';
    /**
     * (curl-impersonate) SSL Compression type. Eg. brotli
     *
     * Official libcurl documentation: : [https://github.com/lwthiker/curl-impersonate/blob/main/chrome/patches/curl-impersonate.patch#L125](https://github.com/lwthiker/curl-impersonate/blob/main/chrome/patches/curl-impersonate.patch#L125)
     */
    readonly SSL_COMPRESSION: 'SSL_COMPRESSION';
    /**
     * (curl-impersonate) TLS Client hello match Extension
     *
     * Official libcurl documentation: : [https://github.com/lwthiker/curl-impersonate/blob/main/chrome/patches/curl-impersonate.patch#L119](https://github.com/lwthiker/curl-impersonate/blob/main/chrome/patches/curl-impersonate.patch#L119)
     */
    readonly SSL_ENABLE_ALPS: 'SSL_ENABLE_ALPS';
}
/**
 * @public
 */
export type MultiOptionName = 'CHUNK_LENGTH_PENALTY_SIZE' | 'CONTENT_LENGTH_PENALTY_SIZE' | 'MAX_CONCURRENT_STREAMS' | 'MAX_HOST_CONNECTIONS' | 'MAX_PIPELINE_LENGTH' | 'MAX_TOTAL_CONNECTIONS' | 'MAXCONNECTS' | 'PIPELINING' | 'PIPELINING_SERVER_BL' | 'PIPELINING_SITE_BL' | 'PUSHDATA' | 'PUSHFUNCTION' | 'SOCKETDATA' | 'SOCKETFUNCTION' | 'TIMERDATA' | 'TIMERFUNCTION' | 'SSL_COMPRESSION' | 'SSL_ENABLE_ALPS';
//# sourceMappingURL=MultiOption.d.ts.map