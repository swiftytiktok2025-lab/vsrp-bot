const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField } = require('discord.js');

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
  console.log(`JOIN EVENT FIRED: ${member.user.tag} | guild=${member.guild.id}`);

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
    console.log(`✅ Welcome sent in ${member.guild.name}`);
  } catch (err) {
    console.error('❌ Failed to send welcome:', err);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content === '!testwelcome') {
    console.log(`TEST COMMAND FIRED in guild ${message.guild.id}`);

    const channelId = welcomeChannels[message.guild.id];
    if (!channelId) {
      await message.reply(`No welcome channel configured for guild ${message.guild.id}`);
      return;
    }

    const channel = message.guild.channels.cache.get(channelId);
    if (!channel) {
      await message.reply(`Welcome channel not found: ${channelId}`);
      return;
    }

    const me = message.guild.members.me;
    if (!me) {
      await message.reply('Bot member object not found.');
      return;
    }

    const perms = channel.permissionsFor(me);
    if (
      !perms?.has(PermissionsBitField.Flags.ViewChannel) ||
      !perms?.has(PermissionsBitField.Flags.SendMessages) ||
      !perms?.has(PermissionsBitField.Flags.EmbedLinks)
    ) {
      await message.reply('Bot is missing View Channel, Send Messages, or Embed Links in the welcome channel.');
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('🧪 Test Welcome')
      .setDescription(`This is a test welcome in <#${channelId}>`);

    try {
      await channel.send({ embeds: [embed] });
      await message.reply('Test welcome sent.');
      console.log(`✅ Test welcome sent to ${channelId}`);
    } catch (err) {
      console.error('❌ TEST SEND ERROR:', err);
      await message.reply('Failed to send test welcome. Check Fly logs.');
    }
  }
});

client.login(TOKEN);