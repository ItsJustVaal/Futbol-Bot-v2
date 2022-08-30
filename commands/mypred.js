module.exports = {
    name: "mypred",
    execute(message){
        const { EmbedBuilder, Discord } = require('discord.js');
        const data = require('../jsons/member.json');
        const matches = require('../jsons/matches.json');
        const thisID = message.author.id;
  
	
        if(!data.hasOwnProperty(thisID))
            return message.reply('You are not in the System! Do .join first and then try again! If you think this is a mistake @ Hannah!');
            let embed = new EmbedBuilder()
                .addFields(
                    { name: `Group 1:`, value: `
                ${matches.FirstSet.Left1} ${data[thisID].one1Left}-${data[thisID].one1Right} ${matches.FirstSet.Right1}
                ${matches.FirstSet.Left2} ${data[thisID].one2Left}-${data[thisID].one2Right} ${matches.FirstSet.Right2}
                ${matches.FirstSet.Left3} ${data[thisID].one3Left}-${data[thisID].one3Right} ${matches.FirstSet.Right3}
                ${matches.FirstSet.Left4} ${data[thisID].one4Left}-${data[thisID].one4Right} ${matches.FirstSet.Right4}
            `, inline: true},
                    { name: `Group 2:`, value: `
                ${matches.SecondSet.Left1} ${data[thisID].two1Left}-${data[thisID].two1Right} ${matches.SecondSet.Right1}
                ${matches.SecondSet.Left2} ${data[thisID].two2Left}-${data[thisID].two2Right} ${matches.SecondSet.Right2}
                ${matches.SecondSet.Left3} ${data[thisID].two3Left}-${data[thisID].two3Right} ${matches.SecondSet.Right3}
                ${matches.SecondSet.Left4} ${data[thisID].two4Left}-${data[thisID].two4Right} ${matches.SecondSet.Right4}
            `, inline: true},
                    { name: `Group 3:`, value: `
                ${matches.ThirdSet.Left1} ${data[thisID].three1Left}-${data[thisID].three1Right} ${matches.ThirdSet.Right1}
                ${matches.ThirdSet.Left2} ${data[thisID].three2Left}-${data[thisID].three2Right} ${matches.ThirdSet.Right2}
                ${matches.ThirdSet.Left3} ${data[thisID].three3Left}-${data[thisID].three3Right} ${matches.ThirdSet.Right3}
                ${matches.ThirdSet.Left4} ${data[thisID].three4Left}-${data[thisID].three4Right} ${matches.ThirdSet.Right4}
            `, inline: true},
                )
            message.reply({ embeds: [embed] })
    }
}
