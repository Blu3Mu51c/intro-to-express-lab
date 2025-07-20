const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];


const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

const express = require('express');
const app = express()


app.get('/',(req,res)=>{
    console.log(req)
    res.send(`<h1>Home</h1>`)
})

app.get('/greeting/:username',(req,res)=>{
    console.log(req.params.username)
    res.send(`<h1>What a delight it is to see you once more, ${req.params.username}</h1>`)
})

app.get('/roll/:number',(req,res)=>{
    req.params.number = parseInt(req.params.number)
    if(req.params.number === req.params.number){
        res.send(`<h1>Your rolled a ${req.params.number}</h1>`)
    }
    else{
        res.send('<h1>You must specify a number</h1>')
    }

})

app.get('/collectibles/:index',(req,res)=>{
    if(req.params.index < collectibles.length){
        res.send(`<h1>So, you want the ${collectibles[req.params.index].name}? For ${collectibles[req.params.index].price}, it can be yours!</h1>`)
    }
    else{
        res.send('<h1>This item is not yet in stock. Check back soon!</h1>')
    }
})

app.get('/shoes', (req, res) => {
  let newShoes = shoes; // Start with full list

  const minPrice = req.query['min-price'];
  const maxPrice = req.query['max-price'];
  const type = req.query.type;

  if (minPrice) {
    newShoes = newShoes.filter(shoe => shoe.price >= (minPrice));
  }

  if (maxPrice) {
    newShoes = newShoes.filter(shoe => shoe.price <= (maxPrice));
  }

  if (type) {
    newShoes = newShoes.filter(shoe => shoe.type === type.toLowerCase());
  }

  res.send(newShoes);
});


app.listen(3000,()=>{
    console.log('port 3000')
})
