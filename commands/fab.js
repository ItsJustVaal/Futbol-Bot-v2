module.exports = {
    name: "fab",
    execute(message) {
        const fs = require("fs");
        const data = JSON.parse(fs.readFileSync(`data/data.json`));
        const { Client } = require("twitter-api-sdk");
        const { EmbedBuilder } = require('discord.js');
        
        const client = new Client(data.beartoken);

        async function main() {
        const response = await client.tweets.tweetsRecentSearch({
            "query": "from:FabrizioRomano -is:reply -is:retweet",
            "max_results": 10,
            "sort_order": "recency",
        });
        

        const tweets = response.data.map(tweet => tweet.text)
        let embed = new EmbedBuilder().setColor('#1900ff').setTitle('FABS GREATEST HITS')

        for(let i = 0; i < 6; i++){
            embed.addFields(
                { name: '-----------------', value: `- ${tweets[i].replace(/[\r\n\+]/gm, '')}`, inline: true}
            )
        }
        
        embed.addFields( {name: 'Uses of this command left: ', value: `${data.uses}`})
        message.reply({ embeds: [embed] })
        
        data.uses = Number.parseInt(data.uses) - 1;
        fs.writeFileSync(`data/data.json`, JSON.stringify(data, null, 2), err=>{
            if(err) {
                console.log(err)
                return;
            };
        })

        }
    }
}







