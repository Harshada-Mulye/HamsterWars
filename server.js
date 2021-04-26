const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters.js')
const matches = require('./routes/matches.js')
const defeated = require('./routes/defeated.js')
const score = require('./routes/score.js')
const fewMatches = require('./routes/fewMatches.js')
const manyMatches = require('./routes/manyMatches.js')

const PORT = process.env.PORT || 1339
const staticFolder = path.join(__dirname, 'static')

app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.params);
	next()
})

app.use( express.json() )
app.use( cors() )
app.use( express.static(staticFolder) )


app.use('/hamsters', hamsters)
app.use('/matches', matches)
app.use('/defeated', defeated)
app.use('/score', score)
app.use('/fewMatches', fewMatches)
app.use('/manyMatches', manyMatches)

app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})