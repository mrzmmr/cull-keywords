'use strict'

const retextKeywords = require('retext-keywords')
const nlcstToString = require('nlcst-to-string')
const retext = require('retext')

const defaults = {
  keyphrases: false,
  keywords: false,
  format: false
}

const doop = () => {}

const cullKeywords = (string = '', options = defaults, cb = doop) => {
  let keyphrases
  let keywords
  let settings
  let returns
  let vfile

  if (!string || typeof string !== 'string' || string.length === 0) {
    return cb(new Error('Expected `string` as first `argument`.'))
  }

  if (typeof options === 'string') {
    settings = Object.assign(defaults, {[options]: true})
  } else {
    settings = Object.assign(defaults, options)
  }

  vfile = retext().use(retextKeywords).process(string)
  returns = {}

  keywords = vfile.data.keywords.map(key => {
    return nlcstToString(key.matches[0].node).replace('2\'2', '\'').replace('\n', ' ')
  }).sort()

  keyphrases = vfile.data.keyphrases.map(key => {
    return (key.matches[0].nodes.map(nlcstToString).join('').replace('2\'2', '\'')
      .replace('\n', ' ')
    )
  }).sort()

  if (settings.format) {
    keyphrases = keyphrases.map(key => key.replace('\'', '').split(' ').join('-'))
  }

  if (settings.keywords) {
    Object.assign(returns, {keywords})
  }

  if (settings.keyphrases) {
    Object.assign(returns, {keyphrases})
  }

  if (!settings.keyphrases && !settings.keywords) {
    Object.assign(returns, {keywords, keyphrases})
  }

  return cb(null, returns)
}

module.exports = (string = '', options = defaults, cb = doop) => {
  if (typeof options === 'function') {
    cb = options
    options = defaults
  }

  if (cb.name !== 'doop') {
    return cullKeywords(string, options, cb)
  }

  return new Promise((resolve, reject) => {
    return cullKeywords(string, options, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}
