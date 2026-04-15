const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Bot is alive');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

const TOKEN = (process.env.TOKEN || '').trim();
console.log('TOKEN exists:', !!TOKEN);
console.log('TOKEN length:', TOKEN.length);

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on('error', (error) => {
  console.error('Discord client error:', error);
});

client.on('shardError', (error) => {
  console.error('Discord shard error:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

console.log('🚀 About to call client.login()');

client.login(TOKEN)
  .then(() => {
    console.log('✅ client.login() resolved');
  })
  .catch((error) => {
    console.error('❌ client.login() failed:', error);
  });