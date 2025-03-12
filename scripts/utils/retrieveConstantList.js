const cheerio = require('cheerio')

const { curly } = require('../../dist')
const { optionExtraDescriptionValueMap } = require('../data/options')

const {
  convertCurlConstantToCamelCase,
} = require('./convertCurlConstantToCamelCase')

const retrieveConstantList = async ({ url, constantPrefix, blacklist }) => {
  const { data } = await curly.get(url, {
    SSL_VERIFYPEER: false,
  })

  const $ = cheerio.load(data)

  const constants = $('.nroffip')

  return constants
    .map((i, el) => {
      const $descriptionEl = $(el).parent().next()

      $descriptionEl.find('a').remove()

      let description = $descriptionEl
        .text()
        .trim()
        .replace(/See$/, '')
        .replace(/>/g, '\\>')
        .trim()

      const constantOriginal = $(el).text()
      const constantName = constantOriginal.replace(constantPrefix, '')

      const url = `https://curl.haxx.se/libcurl/c/${constantOriginal}.html`

      if (optionExtraDescriptionValueMap[constantName]) {
        const extraDescription = optionExtraDescriptionValueMap[constantName]
        description = `${description}${extraDescription}`
      }

      return {
        constantOriginal,
        constantName,
        constantNameCamelCase: convertCurlConstantToCamelCase(constantName),
        description,
        url,
      }
    })
    .get()
    .sort((a, b) => a.constantName.localeCompare(b.constantName))
    .filter((item) => !blacklist.includes(item.constantOriginal))
    .concat(
      /**
       * curl-impersonate new options
       */
      [
        {
          constantOriginal: 'CURLOPT_SSL_CERT_COMPRESSION',
          constantName: 'SSL_COMPRESSION',
          constantNameCamelCase: 'sslCompression',
          description: '(curl-impersonate) SSL Compression type. Eg. brotli',
          url:
            'https://github.com/lwthiker/curl-impersonate/blob/main/chrome/patches/curl-impersonate.patch#L125',
        },
        {
          constantOriginal: 'CURLOPT_SSL_ENABLE_ALPS',
          constantName: 'SSL_ENABLE_ALPS',
          constantNameCamelCase: 'sslEnableAlps',
          description: '(curl-impersonate) TLS Client hello match Extension',
          url:
            'https://github.com/lwthiker/curl-impersonate/blob/main/chrome/patches/curl-impersonate.patch#L119',
        },
      ],
    )
}

module.exports = {
  retrieveConstantList,
}
