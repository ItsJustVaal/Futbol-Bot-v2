// pull in the fixtures for the current gw
// sort of hard coded only for CL 
// syntax MUST BE: .pred GW#GRP# 0-0 1-1 2-2 3-3
// EXAMPLE: .pred 11 0-0 1-1 2-2 3-3
// this combined with the fixtures command will allow people to predict 
// at any point for every posted game week at any time
module.exports = {
    name: "pred",
    execute(message) {
        const fs = require("fs");
        const { EmbedBuilder } = require('discord.js');
        const fixtures = JSON.parse(fs.readFileSync(`jsons/leagues/CL.json`));
        const users = JSON.parse(fs.readFileSync(`jsons/preds.json`));

        // checks message format
        if (!message.content.match(/(\.pred)\s(\d{2})\s(\d-\d)\s(\d-\d)\s(\d-\d)\s(\d-\d)/g)){
            message.reply('Invalid Syntax, .help for more info')
            return;
        }

        // checks if user exists
        const userID = message.author.id;
        if(!users.hasOwnProperty(userID)){
            users[userID] = {}
        }

        //sets variables
        let table = [], predictions = [], data = [];
        const msg = message.content.split(' ')
        const gw = msg[1].slice(0,1)
        const groupNum = msg[1].slice(1)
        const final = fixtures.response[(Object.keys(fixtures.response).length - 1)].league.round;
        if(gw < users.Gameweek || gw > final[final.length -1] || groupNum < 0 || groupNum > 4){
            message.reply('nope sorry');
            return;
        }

        
        // Gets the preds
        msg.forEach(item => predictions.push(item.split('-')));
        predictions.splice(0,2)

        // gets all matches for the gw
        let filtered = fixtures.response.filter(item => item.league.round.endsWith(` ${gw}`) === true)

        // sets gw table
        filtered.forEach(fixture => {
            let home = fixture.teams.home.name
            let away = fixture.teams.away.name
            table.push( {
                [home] : '-',
                [away] : '-'
            })
        })

        // checks if they have a pred for the gw, sets one if not
        if (!users[userID].hasOwnProperty(gw)){
            users[userID][gw] = []
        }


        // Sets Groups
        let groupOne = { 'group1': table.slice(0,4)}
        let groupTwo = { 'group2':table.slice(4,8)}
        let groupThree = { 'group3':table.slice(8, 12)}
        let groupFour = { 'group4':table.slice(12)}

        //updates users predictions if they exist
        function updatePred(locks, groupNm, str, index){
                let num = 0
                users[userID][gw][index][str].forEach(item => {
                    item[locks[num][0]] = groupNm[str][num][locks[num][0]]
                    item[locks[num][1]] = groupNm[str][num][locks[num][1]]
                    num++;
                }
            )}
        
        function makeEmbed(group, groupn){
            let embedTable = [], embed = [];
                group[groupn].forEach(item => embedTable.push(Object.keys(item), Object.values(item)))
                let j = 1;
                for (let i = 0; i < embedTable.length ; i += 2){
                    embed.push(`${embedTable[i][0]} : ${embedTable[j][0]} | ${embedTable[i][1]} : ${embedTable[j][1]}`)
                    j += 2;
                }
            return embed;
        }

        // switch statement for which group the user wants to update
        // documentation is the same for each statement and can be seen in case 1
        let counter = 0;
        switch(groupNum){
            case '1':
                //gets keys
                for (let i = 0; i < groupOne['group1'].length; i++){
                    data.push(Object.keys(groupOne['group1'][i]))
                }
                

                // adds predictions to group Table
                counter = 0;
                for (let i = 0; i < 4; i++){
                    for (let j = 0; j < 2; j++){
                        groupOne['group1'][counter][data[counter][j]] = Number.parseInt(predictions[counter][j])  
                    }
                    counter++;
                }

                
                // checks if the user has a prediction already
                // if they do it changes the value, if not it pushes the table
                if(users[userID][gw] != undefined){
                    if(users[userID][gw][0] != undefined){
                        if(users[userID][gw][0]['group1'] != undefined){
                            updatePred(data, groupOne, 'group1', 0)
                        }else{
                            users[userID][gw].push(groupOne)
                        }
                    }else{
                        users[userID][gw][0] = groupOne
                    }
                }
                let content = makeEmbed(groupOne, 'group1')
                

                let embed = new EmbedBuilder()
                .addFields(
                    { name: 'Pred: ', value: content.join('\n')}
                )
                message.reply({ embeds: [embed] })
                break;
            case '2':
                
                for (let i = 0; i < groupTwo['group2'].length; i++){
                    data.push(Object.keys(groupTwo['group2'][i]))
                }

                counter = 0;
                for (let i = (groupNum * 2); i < (groupNum * 4); i++){
                    for (let j = 0; j < 2; j++){
                        
                        groupTwo['group2'][counter][data[counter][j]] = Number.parseInt(predictions[counter][j])     
                    }
                    counter++;
                }
                
                if(users[userID][gw] != undefined){
                    if(users[userID][gw][1] != undefined){
                        if(users[userID][gw][1]['group2'] != undefined){
                            updatePred(data, groupTwo, 'group2', 1)
                        }else{
                            users[userID][gw].push(groupTwo)
                        }
                    }else{
                        users[userID][gw][1] =groupTwo 
                    }
                }
                content = makeEmbed(groupTwo, 'group2')
                

                embed = new EmbedBuilder()
                .addFields(
                    { name: 'Pred: ', value: content.join('\n')}
                )
                message.reply({ embeds: [embed] })
                break;
            case '3':

                for (let i = 0; i < groupThree['group3'].length; i++){
                    data.push(Object.keys(groupThree['group3'][i]))
                }
                


                counter = 0;
                for (let i = 0; i < 4; i++){
                    for (let j = 0; j < 2; j++){
                        groupThree['group3'][counter][data[counter][j]] = Number.parseInt(predictions[counter][j])  
                    }
                    counter++;
                }


                if(users[userID][gw] != undefined){
                    if(users[userID][gw][2] != undefined){
                        if(users[userID][gw][2]['group3'] != undefined){
                            updatePred(data, groupThree, 'group3', 2)
                        }else{
                            users[userID][gw].push(groupThree)
                        }
                    }else{
                        users[userID][gw][2] = groupThree
                    }
                }
                content = makeEmbed(groupThree, 'group3')
                

                embed = new EmbedBuilder()
                .addFields(
                    { name: 'Pred: ', value: content.join('\n')}
                )
                message.reply({ embeds: [embed] })
                break;
            case '4':

                for (let i = 0; i < groupFour['group4'].length; i++){
                    data.push(Object.keys(groupFour['group4'][i]))
                }
                

                counter = 0;
                for (let i = 0; i < 4; i++){
                    for (let j = 0; j < 2; j++){
                        groupFour['group4'][counter][data[counter][j]] = Number.parseInt(predictions[counter][j])  
                    }
                    counter++;
                }

                
                if(users[userID][gw] != undefined){
                    if(users[userID][gw][3] != undefined){
                        if(users[userID][gw][3]['group4'] != undefined){
                            updatePred(data, groupFour, 'group4', 3)
                        }else{
                            users[userID][gw].push(groupFour)
                        }
                    }else{
                        users[userID][gw][3] = groupFour
                    }
                }
                content = makeEmbed(groupFour, 'group4')
                

                embed = new EmbedBuilder()
                .addFields(
                    { name: 'Pred: ', value: content.join('\n')}
                )
                message.reply({ embeds: [embed] })
                break;
        }


        // saves json
        fs.writeFileSync(`jsons/preds.json`, JSON.stringify(users, null, 2), err=>{
            if(err) {
                console.log(err)
                return;
            };
        })
    }
}
