const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const TOKEN = (process.env.TOKEN || '').trim();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const welcomeChannels = {
  '1489760432120926228': '1489760432917844207', // Main server
  '1489874449527476224': '1489874451070849079'  // Department hub
};

client.once('ready', async () => {
  console.log(`✅ Bot online: ${client.user.tag}`);

  // Startup test to both welcome channels
  for (const [guildId, channelId] of Object.entries(welcomeChannels)) {
    try {
      const channel = await client.channels.fetch(channelId);
      if (!channel) {
        console.log(`❌ Startup test failed: channel not found for guild ${guildId}`);
        continue;
      }

      const embed = new EmbedBuilder()
        .setColor(0x24042E)
        .setTitle('🧪 Startup Test')
        .setDescription(`Bot is connected and can send messages here.\nGuild: ${guildId}\nChannel: ${channelId}`);

      await channel.send({ embeds: [embed] });
      console.log(`✅ Startup test sent to ${channelId}`);
    } catch (err) {
      console.error(`❌ Startup test failed for ${channelId}:`, err);
    }
  }
});

client.on('guildMemberAdd', async (member) => {
  console.log(`👤 JOIN EVENT: ${member.user.tag} in guild ${member.guild.id}`);

  const channelId = welcomeChannels[member.guild.id];
  if (!channelId) {
    console.log(`❌ No welcome channel configured for guild ${member.guild.id}`);
    return;
  }

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
      console.log(`❌ Welcome channel not found: ${channelId}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('👋 Welcome to Valley State RP')
      .setDescription(`Welcome ${member}! Glad to have you here.`);

    await channel.send({ embeds: [embed] });
    console.log(`✅ Welcome sent for ${member.user.tag}`);
  } catch (err) {
    console.error(`❌ Failed to send welcome for ${member.user.tag}:`, err);
  }
});

client.login(TOKEN);