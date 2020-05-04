const express = require('express')
const router = express.Router()
const request = require('request');

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

let dreamTeam = []

router.get('/teams/:teamName', function (req, res) {
    const teamName = req.params.teamName
    const teamId = teamToIDs[teamName]
    if (teamId) {
        request('http://data.nba.net/10s/prod/v1/2018/players.json', function (error, response, body) {
            const data = JSON.parse(response.body)
            const players = data.league.standard
            const team = players.filter(u => u.teamId == teamId && u.isActive).map(u => {
                return {
                    firstName: u.firstName, lastName: u.lastName, pos: u.pos, num: u.jersey
                }
            })
            res.send(team)
        });
    }
})

router.post('/team', function (req, res) {
    const teamName = req.body.teamName
    const teamId = req.body.teamId
    teamToIDs[teamName] = teamId
    res.end()
})

router.get('/dreamTeam', function (req, res) {
    if (dreamTeam.length == 0) {
        dreamTeam = []
        request('http://data.nba.net/10s/prod/v1/2018/players.json', function (error, response, body) {
            const data = JSON.parse(response.body)
            const players = data.league.standard
            const random_index = Math.floor(Math.random() * (players.length - 1))
            for (let i = 0; i < 5; i++) {
                dreamTeam.push({
                    firstName: players[i + random_index].firstName,
                    lastName: players[i + random_index].lastName,
                    pos: players[i + random_index].pos,
                    num: players[i + random_index].jersey
                })
            }
            res.send(dreamTeam)
        });
    } else {
        res.send(dreamTeam)
    }
})

router.post('/roster', function (req, res) {
    const newPlayerInfo = req.body
    const newPlayer = {
        firstName: newPlayerInfo['player[firstName]'],
        lastName: newPlayerInfo['player[lastName]'],
        pos: newPlayerInfo['player[pos]'],
        num: newPlayerInfo['player[num]']
    }
    if (!dreamTeam.find(u => u.firstName == newPlayer.firstName && u.lirstName == newPlayer.lirstName)) {
        dreamTeam.push(newPlayer)
    }
    res.send(dreamTeam)
})


module.exports = router