const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const csv = require('csv-parser')
const axios = require('axios')
const cors = require('cors')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.post('/code', async (req, res) => {
  console.log('[POST] code')
  var code = req.body.code

  const result = await axios({
    method: 'get',
    url: `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    responseType: 'json'
  })

  var info = result.data
  var product = info.product

  var namebis = product.generic_name
  var name = product.product_name
  var nova = product.nova_group
  var nutrition = product.nutrition_grade_fr
  var palme = product.ingredients_from_palm_oil_n
  var palmebis = product.ingredients_that_may_be_from_palm_oil_n
  var picture = product.image_url
  var additives = product.additives_n

  console.log('name : ' + name)
  console.log('namebis : ' + namebis)
  console.log('nova : ' + nova)
  console.log('nutrition : ' + nutrition)
  console.log('palme : ' + palme)
  console.log('palmebis : ' + palmebis)
  console.log('picture : ' + picture)
  console.log('additives : ' + additives)

  // two possible fields for name
  if (name === null || name === '') {
    name = namebis
  }

  var fields = [
    { name: name,
      nova: nova,
      nutrition: nutrition,
      palme: palme,
      palmebis: palmebis,
      picture: picture,
      additives: additives }
  ]
  res.send(fields)
})

// requête get sur http://localhost/products
// http://localhost:3000/products?search_terms=findus
app.get('/products', async (req, res, next) => {
  const searchTerms = req.query['search_terms']

  const result = await axios({
    method: 'get',
    url: `https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${searchTerms}&sort_by=unique_scans_n&page_size=1&download=on`,
    responseType: 'stream'
  })

  const results = []

  result.data.pipe(csv({ separator: '\t' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // console.log(results)
      res.json(results)
    })
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
