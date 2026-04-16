const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const TOKEN = (process.env.TOKEN || '').trim();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ✅ YOUR SERVERS + CHANNELS
const SERVERS = {
  MAIN: '1489760432120926228',
  HUB: '1489874449527476224'
};

const CHANNELS = {
  MAIN_WELCOME: '1489760432917844207',
  HUB_WELCOME: '1489874451070849079'
};

// ✅ BOT READY
client.once('ready', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// ✅ WELCOME SYSTEM
client.on('guildMemberAdd', async (member) => {
  console.log(`👤 JOIN: ${member.user.tag} | Guild: ${member.guild.id}`);

  let channelId;
  let embed;

  // 🔵 MAIN SERVER
  if (member.guild.id === SERVERS.MAIN) {
    channelId = CHANNELS.MAIN_WELCOME;

    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('👋 Welcome to Valley State RP')
      .setDescription(
        `Welcome ${member} to **Valley State Roleplay**.\n\n` +
        `Make sure you complete the steps below before getting started.`
      )
      .addFields(
        { name: '📖 Rules', value: '<#1489760432917844208>' },
        { name: '🎭 Roles', value: '<#1489760433199120445>' },
        { name: '🎮 How to Join', value: '<#1489791922351640637>' },
        { name: '❓ Help', value: '<#1489792058012078090>' }
      )
      .setFooter({ text: 'Valley State RP • Your Story Starts Here' });
  }

  // 🟣 DEPARTMENT HUB
  else if (member.guild.id === SERVERS.HUB) {
    channelId = CHANNELS.HUB_WELCOME;

    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('🏛️ Welcome to the Department Hub')
      .setDescription(
        `Welcome ${member} to the **Valley State Department Hub**.\n\n` +
        `Use this server to apply, transfer, and stay updated with departments.`
      )
      .addFields(
        { name: '👋 Start Here', value: '<#1489874451070849079>' },
        { name: '📢 Announcements', value: '<#1489874451284623366>' },
        { name: '🎫 Support', value: '<#1489874455587979312>' },
        { name: '👮 Applications', value: '<#1490187586449313983>' }
      )
      .setFooter({ text: 'Valley State RP Department Hub' });
  }

  if (!channelId) {
    console.log('❌ No matching server');
    return;
  }

  try {
    const channel = await client.channels.fetch(channelId);

    if (!channel) {
      console.log(`❌ Channel not found: ${channelId}`);
      return;
    }

    await channel.send({ embeds: [embed] });
    console.log(`✅ Welcome sent in ${member.guild.name}`);
  } catch (err) {
    console.error('❌ Failed to send welcome:', err);
  }
});

// ✅ LOGIN
client.login(TOKEN);