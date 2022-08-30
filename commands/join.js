module.exports = {
    name: "join",
    execute(message) {
      const fs = require("fs");
      const join = JSON.parse(fs.readFileSync('jsons/member.json'));
      const thisID = message.author.id;
      let newMemberID = Object.keys(join).length + 1;

      if (join.hasOwnProperty(thisID)) {
        message.reply(`You are already in the system!`);
      } else {
        join[thisID] = {
          id: newMemberID,
          userName: message.member.displayName,
          isPlaying: 0,
          money: 0,
          overallPoints: 0,
          matchdayPoints: 0,
          gameWeekPoints: 0,
        };
        message.reply(
          "You got added to the System! Type .help to see what you can do!"
        );
        fs.writeFileSync(
            'jsons/member.json',
            JSON.stringify(join, null, 2),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
      }
    },
  };