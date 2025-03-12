const { Curl, CurlHttpVersion, CurlSslVersion } = require('../dist')

async function main() {
  const headers = [
    'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
    'sec-ch-ua-mobile: ?0',
    'sec-ch-ua-platform: "Windows"',
    'Upgrade-Insecure-Requests: 1',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site: none',
    'Sec-Fetch-Mode: navigate',
    'Sec-Fetch-User: ?1',
    'Sec-Fetch-Dest: document',
    'Accept-Encoding: gzip, deflate, br',
    'Accept-Language: en-US,en;q=0.9',
  ]

  const curl = new Curl()

  curl.setOpt(Curl.option.URL, 'https://google.com')
  curl.setOpt(Curl.option.FOLLOWLOCATION, 1)
  curl.setOpt(Curl.option.HTTPHEADER, headers)
  curl.setOpt(Curl.option.HTTP_VERSION, CurlHttpVersion.V2_0)
  // curl.setOpt(Curl.option.SSL_FALSESTART, 1)
  curl.setOpt(Curl.option.ACCEPT_ENCODING, 'gzip, deflate, br')
  curl.setOpt(
    Curl.option.SSL_CIPHER_LIST,
    'TLS_AES_128_GCM_SHA256,TLS_AES_256_GCM_SHA384,TLS_CHACHA20_POLY1305_SHA256,ECDHE-ECDSA-AES128-GCM-SHA256,ECDHE-RSA-AES128-GCM-SHA256,ECDHE-ECDSA-AES256-GCM-SHA384,ECDHE-RSA-AES256-GCM-SHA384,ECDHE-ECDSA-CHACHA20-POLY1305,ECDHE-RSA-CHACHA20-POLY1305,ECDHE-RSA-AES128-SHA,ECDHE-RSA-AES256-SHA,AES128-GCM-SHA256,AES256-GCM-SHA384,AES128-SHA,AES256-SHA',
  )
  curl.setOpt(Curl.option.SSLVERSION, CurlSslVersion.TlsV1_2)
  curl.setOpt(Curl.option.SSL_ENABLE_NPN, 0)
  curl.setOpt(Curl.option.SSL_ENABLE_ALPS, 1)
  curl.setOpt(Curl.option.SSL_COMPRESSION, 'brotli')

  curl.on('end', function (status, data, headers) {
    console.log(status, data, headers)
    this.close()
  })

  curl.perform()
}

main()
