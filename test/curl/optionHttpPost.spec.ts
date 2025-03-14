/**
 * Copyright (c) Jonathan Cardoso Machado. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
} from 'vitest'

import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

import formidable from 'formidable'

import { createServer } from '../helper/server'
import { Curl } from '../../lib'
import assert from 'assert'
import { withCommonTestOptions } from '../helper/commonOptions'

const image =
  'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzdFRkY3QTlGQjc4MTFFMjk0NDBCMERBRkQzQUE3M0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzdFRkY3QUFGQjc4MTFFMjk0NDBCMERBRkQzQUE3M0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozN0VGRjdBN0ZCNzgxMUUyOTQ0MEIwREFGRDNBQTczQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozN0VGRjdBOEZCNzgxMUUyOTQ0MEIwREFGRDNBQTczQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps/V1jgAAAKyUExURZrWULHgef///oTOLP7//cHmlKLZXtDsrv3+/IXOLYPNKuLzzfn99fv9+InQNPD55vr99/z++u744ofPMP3++5TURorQNZvXUvv995XUR5zXVKDZW4/SPvb78IXOLP7+/PT67JDSQNPts4rQNvf88d/yyK7ec7njhqPaYLXhf+P0zuv33Nzxw/f88pPTRO/55LLgeoTNK4zROLThfej22IfPMdbuuPL66JHTQYjPMbvkiub107bigcTnmdjvu5bVS4bOLo3ROuj217Dfd/r99vL66cvqpYvQNsXnmsrpo83rqanca/j88o/SPafcaOHzy7/lkNXutvz++ZLTQ77lj6rdbczqp/P668LmlZXUSPn89L3kjeP0z9Hsr/j88/H66I3RO5jVTajcarThfonPM7jjha/fddrwvobOL5jWTrfiguz33ovQN+/54+v33azdb9TutMfonqXbZOr3257YV7zki7rjibzkjMnpoYjPMr/lkfP66tzxwqTaYs7rqo7SPMbondLtstjvvPb77/X77Z3XVd3xxabbZsjpn6bbZZvXU/H555HSQNHtsMrqpOf11uT00JPTRen22dXut9nwvdbvucDmku344bnjh+DyyeT00Z/YWc/srdvwwer22pLTQtrwv47RO6rdbO3438bonJXUScPnmJfVTM7rq8Dmk5zXVaLaX+f11dTutdnwvuHzzMPnl/X77un22LrjiLfig63ecpbVSq3ecb3ljp7YWLjihKvdb+b11PT77ZrWUdvwwNfvupnWUKzecN7yxozROaHZXK7edO344Kvdbqjcad7yx53YVqTaYeDzypnWT6fcZ9Ltsez33ZfVS8LmlsjpoPD55cnporHfeN3xxNfvubPge7bhgKncarDfdqHZXeX00sXom5DSP8vqpuX104PNKf///6+VmogAAAsnSURBVHja7J33W1THGsdx2XUXlrZ0QVwUEBCQIkJABOlNkCoooEHBglhQUZSOJvbeu7HHEhNLLNGYdpOb3pOb3H7vOf/HRR8wZ87O7M5pu+/eZ78/sjtz5sOec+Z935l5Xyf2/0RODhAHiAPEAeIAcYA4QBQHCdF++k0Lw7R886l2ix2DpLb5MC/lk5FqpyBemukMoukaLzsEUU2ayJho4iSVvYFMeY3B6sspdgXiOZkharKn3YC4VfgwZuSz2c0uQNTa8YwFjdeq4YPMCWIoFHQb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'
const imageFilePath = path.resolve(
  __dirname,
  `${crypto.randomBytes(8).toString('hex')}.png`,
)
const buffer = Buffer.from(image, 'base64')
const size = buffer.length

let curl: Curl
let serverInstance: ReturnType<typeof createServer>

describe('Option HTTPPOST', () => {
  beforeEach(() => {
    curl = new Curl()
    withCommonTestOptions(curl)
    curl.setOpt('URL', serverInstance.url)
  })

  afterEach(() => {
    curl.close()
  })

  beforeAll(async () => {
    serverInstance = createServer()
    serverInstance.app.post('/', (req, res, next) => {
      // parse a file upload
      // @ts-ignore
      const form = formidable({ multiples: true })

      // @ts-ignore
      form.parse(req, (error, _fields, files) => {
        if (error) {
          next(error)
          return
        }

        const file = files.file?.[0]
        assert(file)

        const response = {
          size: file.size,
          name: file.originalFilename,
          type: file.mimetype,
        }

        res.json(response)
      })
    })
    await serverInstance.listen()
    await fs.writeFile(imageFilePath, buffer)
  })

  afterAll(async () => {
    serverInstance.close()
    serverInstance.app._router.stack.pop()
    await fs.unlink(imageFilePath)
  })

  it('should upload file correctly', async () => {
    const postData = [
      {
        name: 'file',
        file: imageFilePath,
        type: 'image/png',
      },
    ]

    curl.setOpt('HTTPPOST', postData)

    const result = await new Promise<{ status: number; data: string }>(
      (resolve, reject) => {
        curl.on('end', (status, data) => {
          if (status !== 200) {
            reject(new Error(`Invalid status code: ${status}`))
            return
          }

          resolve({ status, data: data as string })
        })

        curl.on('error', reject)

        curl.perform()
      },
    )

    const parsedData = JSON.parse(result.data)

    expect(parsedData.size).toBe(size)
    expect(parsedData.name).toBe(imageFilePath.split(path.sep).pop())
    expect(parsedData.type).toBe(postData[0].type)
  })

  it('should upload file correctly with filename', async () => {
    const name = Math.random().toString(36).substring(7)
    const postData = [
      {
        name: 'file',
        file: imageFilePath,
        type: 'image/png',
        filename: name,
      },
    ]

    curl.setOpt('HTTPPOST', postData)

    const result = await new Promise<{ status: number; data: string }>(
      (resolve, reject) => {
        curl.on('end', (status, data) => {
          if (status !== 200) {
            reject(new Error(`Invalid status code: ${status}`))
            return
          }

          resolve({ status, data: data as string })
        })

        curl.on('error', reject)

        curl.perform()
      },
    )

    const parsedData = JSON.parse(result.data)

    expect(parsedData.size).toBe(size)
    expect(parsedData.name).toBe(name)
    expect(parsedData.type).toBe(postData[0].type)
  })
})
