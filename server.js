const express = require('express')
const app = express()
const path = require('path')

app.use('/public', express.static('./public'))
app.use('/img', express.static('./img'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(process.env.PORT || 3000)
