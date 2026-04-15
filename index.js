client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!testwelcome') {
    const guildId = message.guild.id;
    const channelId = welcomeChannels[guildId];

    console.log('TEST guildId:', guildId);
    console.log('TEST channelId:', channelId);

    if (!channelId) {
      await message.reply('No welcome channel configured for this server.');
      return;
    }

    const channel = message.guild.channels.cache.get(channelId);
    if (!channel) {
      await message.reply('Welcome channel not found.');
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('👋 Test Welcome')
      .setDescription(`This is a test welcome message for ${message.author}.`);

    try {
      await channel.send({ embeds: [embed] });
      await message.reply('Test welcome sent.');
    } catch (err) {
      console.error('TEST SEND ERROR:', err);
      await message.reply('Failed to send test welcome.');
    }
  }
});