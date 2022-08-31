// mypred syntax is now .mypred GW#GRP#
// this doesn't have a null check yet but taking a break


module.exports = {
    name: "mypred",
    execute(message){
        const garb = message.content.split(' ')
        const fs = require("fs");
        const { EmbedBuilder, Discord } = require('discord.js');
        const preds = JSON.parse(fs.readFileSync('jsons/preds.json'));
        const thisID = '123499749696471042';
        const gw = garb[1].slice(0,1)
        const groupNum = garb[1].slice(1)
        const group = 'group' + groupNum
        let embedTable = [];
        console.log(gw, groupNum)
        if(!preds.hasOwnProperty(thisID))
            return message.reply('You are not in the System! Do .join first and then try again! If you think this is a mistake @ Hannah!');
            // let embed = new EmbedBuilder()
        preds[thisID][gw][groupNum - 1][group].forEach(element => {
            embedTable.push(Object.keys(element), Object.values(element))
        });
        console.log(embedTable)

        let embed = [];
        let j = 1;
        for (let i = 0; i < embedTable.length ; i += 2){
            embed.push(`${embedTable[i][0]} : ${embedTable[j][0]} | ${embedTable[i][1]} : ${embedTable[j][1]}`)
            j += 2;
        }
        let embedReply = new EmbedBuilder()
        .addFields(
            { name: 'Pred: ', value: embed.join('\n')}
        )
        message.reply({ embeds: [embedReply] })
        
        console.log(embed)





    }
}