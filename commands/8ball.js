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
      "It is certain",
      "Without a doubt",
      "It is decidedly so",
      "As I see it, yes",
      "Most likely",
      "Fuck Yes",
      "Outlook good",
      "Signs point to yes",
      "Better not tell you now",
      "VAR has a better chance of getting a call right.",
      "Don’t count on it",
      "Outlook not so good",
      "My source (Hannah) say no",
      "My source (Majid) say Yes.",
      "Very doubtful",
      "Fuck no",
      "I can't answer that properly or the warden will ban me. So... no.",
      "No.",
      "Spuds have a better chance of winning literally any trophy",
      "Brad says No. Kuppa says Yes. You pick what you want.",
      "Hot damn what a good ass question. Yes.",
      "Get out.",
      "What a waste of a question smh. No.",
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
