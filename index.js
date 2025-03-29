const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
require('./server.js');
require("./keep_alive");

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Load commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} sudah online!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Terjadi kesalahan saat menjalankan perintah.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);