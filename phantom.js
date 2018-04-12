const app = require('express')()
const  = require('cheerio')
const request = require('request')

const peopleNewsUrl = "http://people.com/news/"

app.get('/scrape', (req, res) => {
  request(peopleNewsUrl, (err, response, html) => {

    console.log('typeof html is: ', typeof html)
    const $ = cheerio.load(html)
    //    console.log('article is: ', $('article'))
    //console.log('article children are: ', $('article').children())
    //    console.log('article stuff: ', $('article').children('a.media-img').children('div.lazy-image').children('div.inner-container').children('img'))
    const imageUrl = $('article').children("a.media-img")
              .children("div.lazy-image")
              .children("div.inner-container")
              .children("img").attr('src')
    console.log('imageUrl is: ', imageUrl)
    res.end(html)
  })
})

app.listen(3000)
