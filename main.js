const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("node:path");
const { token } = require("./data/data.json");
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

//here is the commands
bot.commands = new Collection();
const commandPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  const command = require(filePath);
  bot.commands.set(command.name, command);
}

bot.commands.filter((command) => {
  console.log(`Command Loaded: ${command.name}`);
});

bot.once("ready", () => {
  console.log(`Logged in as ${bot.user.username}`);
});

bot.on("messageCreate", async (message) => {
  let args = message.content.substring(1).split(" ");
  if (message.author.bot) return;
  if (!message.content.startsWith(".")) return;
  if (message.channel.id != "747178040798347393") return;
  if (!args[0]) return;

  const calledCommand = bot.commands.get(args[0]);
  if (!calledCommand) return;

  try {
    console.log(
      `${message.author.username} called ${args[0]} command in ${message.channel.name}`
    );
    await calledCommand.execute(message);
  } catch (err) {
    console.error(err);
    await message.reply({ content: "I broke sadguh" });
  }
});

bot.login(token);
