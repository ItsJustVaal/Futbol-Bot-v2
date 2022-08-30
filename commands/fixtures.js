// This is used to update the database json files, only I (vaal) can do this

// What we need:

//Tables and Fixtures for:
//PL, EL, Eredivisie, Bundesliga, LaLiga, SPL, Serie A, CL, WC, H2H 
//'PL', 'EL', 'ER', 'BL', 'LL', 'SPL', 'SA', 'CL', 'WC', 'H2H'
//39, 3, 88, 78, 140, 179, 71, 2, 1

//Fixtures will feed:
//.fixtures - this will change to just pull from the json file to update based on the game week

// What can i do with this data?:
// Show fixtures for the current game week
// Set fixtures for betting
// Results tables and auto calculating betting scores

//Formats:
//PL `Regular Season - num`
//CL `Group Letter - num`
module.exports = {
    name: "fixtures",
    execute(message) {
        const fs = require("fs");
        const { EmbedBuilder } = require('discord.js');
        const leagues = ['PL', 'EL', 'ER', 'BL', 'LL', 'SPL', 'SA', 'CL', 'WC', 'H2H'];
        const msg = message.content.split(' ')

        if (msg.length != 3 || leagues.includes((msg[2])) == false || Number.isInteger(Number.parseInt(msg[1])) == false) {
            message.react('<:MESSIWUT:881640755058335795>MESSIWUT')
            let embed = new EmbedBuilder().addFields({ name: "Code", value: `Try the right syntax 
            .fixtures GW LEAGUE | EXAMPLE: .fixtures 5 PL
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
            H2H = Head to Head`})
            message.reply({ embeds: [embed] })
        }else{
        
            const league = msg[2];
            const weekNum = msg[1];
            const join = fs.readFileSync(`jsons/leagues/${league}.json`);
            const data = JSON.parse(join);
            const lastWeek = data.response[(Object.keys(data.response).length - 1)].league.round
            const final = lastWeek.split(' ')

            if (weekNum > 0 && weekNum < Number.parseInt(final[3])){
                const newfile = data['response'].filter(item => item.league.round.endsWith(` ${weekNum}`) === true);

                let gameweekTable = [];
                newfile.forEach(item => {gameweekTable.push(`${item.teams.home.name} - ${item.teams.away.name}`)}); 


                let embed = new EmbedBuilder()
                    .setTitle(`Fixtures for ${league} Gameweek ${weekNum}`)
                    .addFields(
                        { name: 'H: Home | A: Away', value: gameweekTable.join('\n')}
                    )
                    .setColor('#1900ff')

                message.reply({ embeds: [embed] })
                
                console.log('Sent Fixture list')
            }else {
                message.react('<:MESSIWUT:881640755058335795>MESSIWUT')
                message.reply(`Game Week Doesnt Exist, Max Scheduled Game Week: ${final[3]}`)
            }
        }
    }
}