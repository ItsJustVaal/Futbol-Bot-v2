module.exports = {
    name: "flist",
    execute(message) {
            const fs = require("fs");
            const { EmbedBuilder } = require('discord.js');
            const leagues = ['PL', 'EL', 'ER', 'BL', 'LL', 'SPL', 'SA', 'CL', 'WC', 'H2H'];
            const msg = message.content.split(' ')
            const weekNum = msg[1];
            const league = msg[2];
            
            
            if (msg.length != 3 || leagues.includes((league.toUpperCase())) == false || Number.isInteger(Number.parseInt(msg[1])) == false) {
                let embed = new EmbedBuilder().addFields({ name: "Code", value: `Try the right syntax 
                .flist GW LEAGUE | EXAMPLE: .flist 5 PL
                League Codes:
                PL = Premiere League
                EL = Europa League
                ER = Eredvisie
                BL = Bundesliga
                LL = LaLiga
                SPL = Scottish Premiereship
                SA = Serie A
                CL = Champions League
                WC = World Cup
                `})
                message.reply({ embeds: [embed] })
            }else{
                const join = fs.readFileSync(`jsons/leagues/${league}.json`);
                const data = JSON.parse(join);
                let yellow = [];
                let grey = [];
                let orange = [];
                let gameweek = [];
                const newfile = data['response'].filter(item => item.league.round.endsWith(` ${weekNum}`) === true);
                const lastWeek = data.response[(Object.keys(data.response).length - 1)].league.round
                const final = lastWeek.split(' ')

                if (weekNum > 0 && weekNum <= Number.parseInt(final[3])){    
                    
                    newfile.forEach(element => {
                        yellow.push(element.fixture.date)
                    });

                    let purple = [...new Set(yellow)]
                    purple.forEach(item => orange.push(item.slice(0,16).replace('T', ' T: ')))
                    purple.forEach(item => grey.push(newfile.filter(list => list.fixture.date == item)))

                    for (let i = 0; i < grey.length; i++){
                        for(let j = 0; j < grey[i].length; j++)
                        gameweek.push(`${grey[i][j].teams.home.name} - ${grey[i][j].teams.away.name} | ${orange[i]}` )
                    }

                    let embed = new EmbedBuilder()
                        .setTitle(`Fixtures for ${league} Gameweek ${weekNum}`)
                        .addFields(
                            { name: 'H: Home | A: Away | Day/Month | 24 hr time UTC', value: gameweek.join('\n')}
                        )
                        .setColor('#1900ff')

                    message.reply({ embeds: [embed] })}
                else{
                    message.react('<:pepeLoser:833719194641236068>')
                    message.reply(`Game Week Doesnt Exist, Max Scheduled Game Week: ${final[3]}`)
                }
            }
    }
}
