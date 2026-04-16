const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const TOKEN = (process.env.TOKEN || '').trim();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ✅ BOT READY
client.once('ready', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// ❌ WELCOME SYSTEM DISABLED
// (nothing will happen when someone joins)

// ✅ OPTIONAL COMMANDS STILL WORK
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!donationembed') {
    const donationEmbed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('💎 Valley State RP | Support & Donations')
      .setDescription('Support the server and unlock premium perks.')
      .addFields(
        {
          name: '🎁 Benefits',
          value: '• Priority Queue\n• VIP Roles\n• Custom Content\n• In-Game Perks'
        },
        {
          name: '🛒 Store',
          value: '<#1492688382810394816>'
        }
      )
      .setFooter({ text: 'Valley State RP • Premium Support System' });

    await message.channel.send({ embeds: [donationEmbed] });
  }
});

// ✅ LOGIN
client.login(TOKEN);