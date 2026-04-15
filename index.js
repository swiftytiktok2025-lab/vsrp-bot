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

const welcomeChannels = {
  '1489760432120926228': '1489760432917844207', // main server
  '1489874449527476224': '1489874451070849079'  // department hub
};

client.once('ready', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  console.log(`👤 JOIN EVENT FIRED for ${member.user.tag} in guild ${member.guild.id}`);

  const channelId = welcomeChannels[member.guild.id];
  if (!channelId) {
    console.log(`❌ No welcome channel configured for guild ${member.guild.id}`);
    return;
  }

  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) {
    console.log(`❌ Welcome channel not found: ${channelId}`);
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(0x24042E)
    .setTitle('👋 Welcome to Valley State RP')
    .setDescription(`Welcome ${member}!`)
    .addFields(
      { name: '📖 Rules', value: 'Check the rules channel.' },
      { name: '🎭 Roles', value: 'Grab your roles.' }
    );

  try {
    await channel.send({ embeds: [embed] });
    console.log(`✅ Welcome sent in guild ${member.guild.id}`);
  } catch (err) {
    console.error('❌ Failed to send welcome:', err);
  }
});

client.login(TOKEN);