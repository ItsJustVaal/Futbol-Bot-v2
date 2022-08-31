module.exports = {
    name: "help",
    execute(message){
        const { EmbedBuilder } = require('discord.js');

        const embed = new EmbedBuilder()
            .setTitle('Help Center')
            .addFields( 
                { name: ".join", value: 'Join in on the CL/EL predictions betting to win (or lose) titles!' },
                { name: ".fixtures", value: 'See the current games to bet on' },
                { name: '.pred GW#GRP# PRED-PRED', value: 'Predict Matches - EXAMPLE: .pred 12 4-4 2-2 3-3 1-1 | MUST have 2 numbers plus 4 sets of #-#' },
                { name: '.mypred', value: 'Display your current predictions!'},
                { name: ".standings", value: 'Show current standings from predictions' },
                { name: ".fab", value: "See Fab's latest tweets" }, 
            )
        message.reply({ embeds: [embed] })
    }
}