module.exports = {
    name: "standings",
    execute(message) {
        const fs = require("fs");
        const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
        const jsonFile = fs.readFileSync('jsons/member.json');
        const keys = JSON.parse(jsonFile);
        const bdor = new AttachmentBuilder('../New/data/bdor2.png')
        let data = [], fgw = [], fmd = [], fov = []; 
        let currentPlayers = Object.keys(keys);
        
        currentPlayers.forEach(player => {
            data.push({
                name: keys[player].userName, 
                gwp: keys[player].gameWeekPoints,
                mdp: keys[player].matchdayPoints,
                ovp: keys[player].overallPoints,
            });
        })

        let gameWeek = data.map(x => x).sort((a,b)=> b.gwp - a.gwp);
        let matchday = data.map(x => x).sort((a,b)=> b.mdp - a.mdp);
        let overall = data.map(x => x).sort((a,b)=> b.ovp - a.ovp);

        gameWeek.forEach(person => fgw.push(person.name + ' - ' + person.gwp))
        matchday.forEach(person => fmd.push(person.name + ' - ' + person.mdp))
        overall.forEach(person => fov.push(person.name + ' - ' + person.ovp))

        const embed = new EmbedBuilder()
            .setTitle('Standings: ')
            .setColor('#FFD700')
            .setThumbnail('attachment://bdor2.png')
            .addFields(
                { name: 'Game Week', value: fgw.join('\n'), inline: true},
                { name: 'Match Day', value: fmd.join('\n'), inline: true},
                { name: 'Overall', value: fov.join('\n'), inline: true},
            )
            
        message.reply({ embeds: [embed], files: [bdor] })
    }
};