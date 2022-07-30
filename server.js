const express = require('express')
const app = express()
const port = 3000
const studentRouter = require('./src/student/routes')

app.use(express.json())

app.get('/',(req,res) => {
    res.send({
        'message': 'Hello world'
    })
})

app.use('/api/v1/students',studentRouter)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})