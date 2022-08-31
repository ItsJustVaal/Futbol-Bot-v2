module.exports = {
    name: "help",
    execute(message){
        const { EmbedBuilder } = require('discord.js');

        const embed = new EmbedBuilder()
            .setTitle('Help Center')
            .addFields( 
                { name: ".join", value: 'Join in on the CL/EL predictions betting to win (or lose) titles!' },
                { name: ".fixtures", value: 'See the current games to bet on' },
                { name: '.pred GW#GRP#', value: 'Predict Matches - EXAMPLE: .pred 12 4-4 2-2 3-3 1-1 | MUST have 2 numbers plus 4 sets of #-#' },
                { name: '.mypred', value: 'Display your current predictions!'},
                { name: ".standings", value: 'Show current standings from predictions' },
                { name: ".fab", value: "See Fab's latest tweets" }, 
                )
            //.addField('DiscordFUT', '.showplayer "Messi" - look for player stats and price\n.mybank - check your transfer budget\n.myteam - show your team\n.silverpack - buy a silverpack for $10000\n.goldpack - buy a goldpack for $50000\n.buyplayer "L. Messi" - buy a player\n.sellplayer "L. Messi" - sell a player\n.play @Username - play against someones team and win either 10k or lose 10k!')
        message.reply({ embeds: [embed] })
    }
}