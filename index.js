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

// ===== CHANNEL SETUP =====
const welcomeChannels = {
  '1489760432120926228': '1489760432917844207', // main server
  '1489874449527476224': '1489874451070849079'  // department hub
};

// ===== READY =====
client.once('ready', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// ===== WELCOME SYSTEM =====
client.on('guildMemberAdd', async (member) => {
  const channelId = welcomeChannels[member.guild.id];
  if (!channelId) return;

  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(0x24042E)
    .setTitle('👋 Welcome to Valley State RP')
    .setDescription(`Welcome ${member}! Make sure to get set up below.`)
    .addFields(
      { name: '📖 Rules', value: 'Go to <#1489760432917844208>' },
      { name: '🎭 Roles', value: 'Go to <#1489760433199120445>' },
      { name: '🎮 How to Join', value: 'Go to <#1489791922351640637>' },
      { name: '❓ Help', value: 'Go to <#1489792058012078090>' }
    );

  channel.send({ embeds: [embed] });
});

// ===== DONATION COMMAND =====
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!donationembed') {
    const embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('💎 Support & Donations')
      .setDescription('Support the server and unlock perks.')
      .addFields(
        { name: '🎁 Perks', value: 'Priority Queue\nVIP Roles\nCustom Content' },
        { name: '🛒 Buy Here', value: '<#1492688382810394816>' }
      );

    message.channel.send({ embeds: [embed] });
  }
});

// ===== LOGIN =====
client.login(TOKEN);