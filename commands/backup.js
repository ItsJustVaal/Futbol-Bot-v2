module.exports = {
    name: "backup",
    execute(message){
//         if(message.author.id === '591189530258833419'){
            const fs = require("fs");
            if (fs.existsSync(`jsons/backup.json`)){
                fs.unlinkSync(`jsons/backup.json`)
                console.log("Deleted Old Backup")
            }
            const backup = [JSON.parse(fs.readFileSync(`jsons/member.json`))];
            let test = Object.entries(backup)

            fs.writeFileSync(`jsons/backup.json`, JSON.stringify(test[0][1], null, 2), err=>{
                if(err) {
                    console.log(err)
                    message.reply({ content: 'Backup Failed', ephemeral: true})
                    return;
                };
            })
            console.log('Backup Complete')
            message.reply({ content: 'Backup Complete', ephemeral: true})
        }
    }
// }