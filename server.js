const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')

const peopleNewsUrl = "http://people.com/news/"

app.get('/', (req, res) => res.redirect('/scrape'))

app.get('/scrape', (req, res) => {
  request(peopleNewsUrl, (err, response, html) => {
    const $ = cheerio.load(html)
    const urls = $('article').children('a.media-img').children('div.lazy-image').get().map(article => article.attribs['data-src'])
    
    res.json(urls)
  })
})

app.listen(3000)
