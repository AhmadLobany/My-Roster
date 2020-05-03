const express = require('express')
const app = express()
const path = require('path')
const request = require('request');

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}


app.get('/teams/:teamName',function(req,res) {
    const teamName = req.params.teamName
    const teamId = teamToIDs[teamName]
    if (teamId) {
    request('http://data.nba.net/10s/prod/v1/2018/players.json', function (error, response, body) {
        const data= JSON.parse(response.body)
        const players = data.league.standard
        const team = players.filter(u =>  u.teamId==teamId && u.isActive).map(u => {return{ 
            firstName: u.firstName, lastName: u.lastName , pos: u.pos, num: u.jersey, 
             img: `https://nba-players.herokuapp.com/players/${u.lastName}/${u.firstName}`} })
        res.send(team)
      });
    }
})


const port = 3000
app.listen(port,function() {
    console.log(`Listening on port ${port} ...`)
})