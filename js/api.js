const perfumes = require("../data-base/fragance.json")
const fragances = perfumes ()
const express = require ("express")
const app = express ()
const port = precess.env.port || 3080

app.listen(port, ()=> {
    console.log ("puerto disponible en", port)
})

app.get ('/api/perfumes', (req, res)=>{
    res.send(fragances)
}) 

app.get('/api/perfumes/:recommended', (req, res) =>{
    const add = fragances.filter (c => c.add.includes (req.params.recommended))
        add !== [] ? res.send (add) : res.send({error: "no hay resultados"})
})
