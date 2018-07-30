const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
// this will send us back whole blockchain
app.get('/blockcahin', function(req, res){
    console.log('it works')
})
// this will hit to create a new txn 
app.post('/transaction', function(req, res){
   console.log(req.body)
   res.send(`the amount of the transaction is  ${req.body.amount} bitcoin`)
})
//
app.get('/mine', function(req, res){
    
})
app.listen(3000, function(){
    console.log('Listening on port 3000')
})