// pull in the fixtures for the current gw
// only for CL
// pull full list of people playing from members
// set gw on their file
// length of gw (num of fixtures)
// if they enter nothing then set nothing
// syntax will be .predGWNUM 0-0 1-1 2-2 3-3
// EXAMPLE: .pred1 0-0 1-1 2-2 3-3
// this combined with the fixtures command will allow people to predict 
// at any point for every posted game week at any time
const fs = require("fs");
const fixtures = JSON.parse(fs.readFileSync(`jsons/leagues/CL.json`));
let message = '.pred1 0-1 1-2 2-3 3-4'
const userID = '123499749696471042'
let msg = message.split(' ')
let gw = msg.shift().slice(5)
let table = [], predictions = [], data = [];

msg.forEach(item => predictions.push(item.split('-')));
let filtered = fixtures.response.filter(item => item.league.round.endsWith(` ${gw}`) === true)

filtered.forEach(fixture => {
    let home = fixture.teams.home.name
    let away = fixture.teams.away.name
    table.push( {
        [home] : 0,
        [away] : 0
    })
})

for (let i = 0; i < table.length; i++){
    data.push(Object.keys(table[i]))
}


console.log(table)