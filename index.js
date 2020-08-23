const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "!";

// Format output to be in proper thousandth format (i.e. 1000 => 1,000)
function properNumberFormat(value) {
	var formatter = new Intl.NumberFormat();
	return formatter.format(value);
}

client.on("message", function(message) {
	if (!message.content.startsWith(prefix)) return;

	// Remove the prefix and split message to parse command
	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	// Calculate total for trials
	if (command === "trial") {
		const trialTotal = args.map(x => parseFloat(x));
		let payoutType = ['Finders Returning: ', 'Payout Returning: ', 'Finders New: ', 'Payout New: '];
		let payoutModifiers = [.05, .08636363, .08, .08363636];
		let payoutValues = `\nRun Total Amount: ${properNumberFormat(trialTotal)}`;
		for (var i = 0; i < payoutModifiers.length; i++) {
			payoutValues += '\n' + payoutType[i] + properNumberFormat(payoutModifiers[i] * trialTotal);
		};

		message.reply(`${payoutValues}`);
	}

	// Calculate total for dungeons or arenas
	else if (command === "dungeon" || command === "arena") {
		const fourManTotal = args.map(x => parseFloat(x));
		let payoutType = ['Finders: ', 'Payout 3 Man: ', 'Payout 4 Man: '];
		let payoutModifiers = [.1, .3, .225];
		let payoutValues = `\nRun Total Amount: ${properNumberFormat(fourManTotal)}`;
		for (var i = 0; i < payoutModifiers.length; i++) {
			payoutValues += '\n' + payoutType[i] + properNumberFormat((payoutModifiers[i] * fourManTotal));
		};

		message.reply(`${payoutValues}`);
	}

	else if (command === "command" || command === "help") {
		message.reply('The supported commands for this bot currently are: \n!trial <int>\n!dungeon <int>\n!arena <int>\nEx: !trial 8000');
	}

	else {
		message.reply('Command not recognized. Try !help to find commands.');
	}
});

client.login(config.BOT_TOKEN);
