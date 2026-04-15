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
  '1489760432120926228': '1489760432917844207', // Main server welcome channel
  '1489874449527476224': '1489874451070849079'  // Department hub welcome channel
};

client.once('ready', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  console.log(`👤 Member joined: ${member.user.tag} in ${member.guild.name}`);

  const guildId = member.guild.id;
  const channelId = welcomeChannels[guildId];

  if (!channelId) {
    console.log(`❌ No welcome channel set for guild ${guildId}`);
    return;
  }

  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) {
    console.log(`❌ Welcome channel not found: ${channelId}`);
    return;
  }

  let embed;

  if (guildId === '1489760432120926228') {
    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('👋 Welcome to Valley State RP')
      .setDescription(
        `Welcome ${member} to **Valley State Roleplay** — a structured FiveM roleplay community built around quality, immersion, and professionalism.\n\nMake sure you complete everything below before jumping in.`
      )
      .addFields(
        { name: '📖 Read the Rules', value: 'Go to <#1489760432917844208>' },
        { name: '🎭 Get Your Roles', value: 'Go to <#1489760433199120445>' },
        { name: '🎮 Learn How to Join', value: 'Go to <#1489791922351640637>' },
        { name: '❓ Need Help?', value: 'Go to <#1489792058012078090>' }
      )
      .setFooter({ text: 'Valley State RP • Your Story Starts Here' });
  } else if (guildId === '1489874449527476224') {
    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('🏛️ Welcome to the Valley State Department Hub')
      .setDescription(
        `Welcome ${member} to the **Valley State RP Department Hub**.\n\nThis server is where departments recruit, advertise, process transfers, and share important internal information.`
      )
      .addFields(
        { name: '👋 Start Here', value: 'Check <#1489874451070849079>' },
        { name: '📢 Stay Updated', value: 'Check <#1489874451284623366>' },
        { name: '✅ Review Chain of Command', value: 'Check <#1489874451284623360>' },
        { name: '🎫 Need Assistance?', value: 'Use <#1489874455587979312>' },
        { name: '👮 Apply to a Department', value: 'Go to <#1490187586449313983>' }
      )
      .setFooter({ text: 'Valley State RP Department Hub • Stay Organized' });
  }

  if (!embed) {
    console.log(`❌ No embed built for guild ${guildId}`);
    return;
  }

  try {
    await channel.send({ embeds: [embed] });
    console.log(`✅ Welcome message sent in ${member.guild.name}`);
  } catch (error) {
    console.error('❌ Failed to send welcome message:', error);
  }
});

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

    await message.channel.send({ embeds: [embed] });
  }
});

client.login(TOKEN);