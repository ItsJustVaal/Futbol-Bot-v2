module.exports = {
  name: "8ball",
  execute(message) {
    const fs = require("fs");
    const join = require("../jsons/8ballcheck.json");
    const thisID = message.author.id;
    const content = message.content.split(" ");
    let author = join[thisID];
    if (content[1] === undefined || content[1] === null) {
      message.reply("You have to ask me something you bum");
      return;
    }

    const answer = content[1].toLowerCase();

    if (author === undefined || author === NaN) {
      author = 0;
    }

    if (answer == "uses") {
      message.reply(`You have used ${author} question(s).`);
      return;
    }

    if (author && author === 3) {
      message.reply("Nah, you done for today");
      return;
    } else if (author === 0) {
      join[thisID] = 1;
    } else {
      join[thisID] = join[thisID] + 1;
    }

    choice = [
      
    ];

    let pick = Math.floor(Math.random() * choice.length);
    message.reply(choice[pick]);

    fs.writeFileSync("./jsons/8ballcheck.json", JSON.stringify(join), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};
