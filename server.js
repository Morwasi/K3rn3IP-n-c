const express = require('express')

const app = express()



app.get('/', (req, res) => {
    res.send('<h1>Express Demo App</h1> <h4>Message: Success Again</h4> <p>Version 2.0</p>');
    })

app.listen(8080, () => {
    console.log('server running on port 8080')
})