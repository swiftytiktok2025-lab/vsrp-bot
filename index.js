client.on('guildMemberAdd', async (member) => {
  if (member.user.bot) return;

  let channelId;
  let embed;

  if (member.guild.id === '1489760432120926228') {
    channelId = '1489760432917844207';

    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('👋 Welcome to Valley State RP')
      .setDescription(
        `Welcome ${member} to **Valley State Roleplay**.\n\nComplete the steps below to get started.`
      )
      .addFields(
        { name: '📖 Rules', value: '<#1489760432917844208>' },
        { name: '🎭 Roles', value: '<#1489760433199120445>' },
        { name: '🎮 How to Join', value: '<#1489791922351640637>' },
        { name: '❓ Help', value: '<#1489792058012078090>' }
      )
      .setFooter({ text: 'Valley State RP • Your Story Starts Here' });
  } else if (member.guild.id === '1489874449527476224') {
    channelId = '1489874451070849079';

    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('🏛️ Welcome to the Department Hub')
      .setDescription(
        `Welcome ${member} to the **Valley State Department Hub**.\n\nUse this server to apply, transfer, and stay updated with departments.`
      )
      .addFields(
        { name: '👋 Start Here', value: '<#1489874451070849079>' },
        { name: '📢 Announcements', value: '<#1489874451284623366>' },
        { name: '🎫 Support', value: '<#1489874455587979312>' },
        { name: '👮 Applications', value: '<#1490187586449313983>' }
      )
      .setFooter({ text: 'Valley State RP Department Hub' });
  }

  if (!channelId || !embed) return;

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return;

    await channel.send({ embeds: [embed] });
    console.log(`✅ Welcome sent in ${member.guild.name} for ${member.user.tag}`);
  } catch (err) {
    console.error('❌ Failed to send welcome:', err);
  }
});