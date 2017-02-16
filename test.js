'use strict'

const cullKeywords = require('./_index.js')
const tape = require('tape')

const expected = {
  keywords: [ 'MTV', 'Quick', 'fox', 'jumps', 'quack', 'quiz', 'zephyrs' ],
  keyphrases: [ 'Alex Trebek\'s fun TV quiz game', 'Junk MTV quiz',
    'MTV ax quiz prog', 'Quick', 'fox' ]
}

const format = array => array.map(key => key.replace('\'', '').split(' ').join('-'))
const expectedKeywords = expected[0]
const expectedKeyphrases = expected[1]

var string =
`
The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz
prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex.
Waltz, bad, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick
quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick
wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim.
Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex.
Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax
jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs
jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves
quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips
galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The
jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a
quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to
vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek's fun TV quiz game
. Woven silk pyjamas exchanged for blue quartz. Brawny gods just
`

tape('cull-keywords', (test) => {

  /*
   * Should Error
   */

  /* Using promises */
  cullKeywords('', 'format').then(test.notOk).catch(err => {
    test.ok(err instanceof Error)
    test.ok(err.message, 'Expected `string` as first argument.')
  })

  cullKeywords('').then(test.notOk).catch(err => {
    test.ok(err instanceof Error)
    test.ok(err.message, 'Expected `string` as first argument.')
  })

  /* Using callbacks */
  cullKeywords('', 'format', (err, res) => {
    test.notOk(res)
    test.ok(err instanceof Error)
    test.ok(err.message, 'Expected `string` as first argument.')
  })

  cullKeywords('', (err, res) => {
    test.notOk(res)
    test.ok(err instanceof Error)
    test.ok(err.message, 'Expected `string` as first argument.')
  })

  /**
   * Should return results
   */

  /* Using promises */
  cullKeywords(string).then(res => {
    test.ok(res)
    test.deepEqual(res.keyphrases, expected.keyphrases)
    test.deepEqual(res.keywords, expected.keywords)
  }).catch(test.notOk)

  cullKeywords(string, {keyphrases: true, keywords: true}).then(res => {
    test.ok(res)
    test.deepEqual(res.keyphrases, expected.keyphrases)
    test.deepEqual(res.keywords, expected.keywords)
  }).catch(test.notOk)

  cullKeywords(string, 'keyphrases').then(res => {
    test.ok(res)
    test.deepEqual(res.keyphrases, expected.keyphrases)
  })

  cullKeywords(string, 'keywords').then(res => {
    test.ok(res)
    test.deepEqual(res.keywords, expected.keywords)
  })

  cullKeywords(string, 'format').then(res => {
    test.ok(res)
    test.deepEqual(res.keyphrases, format(expected.keyphrases))
    test.deepEqual(res.keywords, format(expected.keywords))
  }).catch(test.notOk)

  cullKeywords(string, {keyphrases: true, keywords: true, format: true}).then(res => {
    test.ok(res)
    test.deepEqual(res.keyphrases, format(expected.keyphrases))
    test.deepEqual(res.keywords, format(expected.keywords))
  }).catch(test.notOk)

  cullKeywords(string, {keyphrases: true, format: true}).then(res => {
    test.ok(res)
    test.deepEqual(res.keyphrases, format(expected.keyphrases))
  })

  cullKeywords(string, {keywords: true, format: true}).then(res => {
    test.ok(res)
    test.deepEqual(res.keywords, format(expected.keywords))
  })

  test.end()
})
