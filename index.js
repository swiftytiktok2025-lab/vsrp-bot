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

const SERVERS = {
  MAIN: '1489760432120926228',
  HUB: '1489874449527476224'
};

const CHANNELS = {
  MAIN_WELCOME: '1489760432917844207',
  HUB_WELCOME: '1489874451070849079'
};

client.once('ready', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  if (member.user.bot) return;

  let channelId;
  let embed;

  // MAIN SERVER EMBED
  if (member.guild.id === SERVERS.MAIN) {
    channelId = CHANNELS.MAIN_WELCOME;

    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setAuthor({
        name: 'Valley State RP',
        iconURL: 'https://cdn.discordapp.com/attachments/1481861144082645012/1493456338913726464/image.png'
      })
      .setTitle('👋 Welcome to Valley State RP')
      .setDescription(
        `Welcome ${member} to **Valley State Roleplay** — a premium FiveM experience focused on realism, structure, and professionalism.\n\n` +
        `Complete the steps below to get fully set up and ready to join the city.`
      )
      .addFields(
        {
          name: '📖 Step 1 • Read the Rules',
          value: 'Head to <#1489760432917844208> and review all server guidelines.'
        },
        {
          name: '🎭 Step 2 • Get Your Roles',
          value: 'Go to <#1489760433199120445> to unlock access and notifications.'
        },
        {
          name: '🎮 Step 3 • Learn How to Join',
          value: 'Visit <#1489791922351640637> for instructions on joining the server.'
        },
        {
          name: '❓ Step 4 • Need Help?',
          value: 'Check <#1489792058012078090> or open a ticket if needed.'
        }
      )
      .setThumbnail('https://cdn.discordapp.com/attachments/1481861144082645012/1493456338913726464/image.png')
      .setFooter({
        text: 'Valley State RP • Your Story Starts Here'
      });
  }

  // DEPARTMENT HUB EMBED
  else if (member.guild.id === SERVERS.HUB) {
    channelId = CHANNELS.HUB_WELCOME;

    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setAuthor({
        name: 'Valley State RP Department Hub',
        iconURL: 'https://cdn.discordapp.com/attachments/1481861144082645012/1493456338913726464/image.png'
      })
      .setTitle('🏛️ Welcome to the Department Hub')
      .setDescription(
        `Welcome ${member} to the **Valley State Department Hub**.\n\n` +
        `This is where departments recruit, process applications, handle transfers, and post important updates.`
      )
      .addFields(
        {
          name: '👋 Start Here',
          value: 'Visit <#1489874451070849079> for your first steps and important information.'
        },
        {
          name: '📢 Announcements',
          value: 'Stay updated in <#1489874451284623366>.'
        },
        {
          name: '🎫 Support',
          value: 'Need help? Use <#1489874455587979312>.'
        },
        {
          name: '👮 Applications',
          value: 'Apply to departments in <#1490187586449313983>.'
        }
      )
      .setThumbnail('https://cdn.discordapp.com/attachments/1481861144082645012/1493456338913726464/image.png')
      .setFooter({
        text: 'Valley State RP • Department System'
      });
  }

  if (!channelId || !embed) return;

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return;

    await channel.send({ embeds: [embed] });
    console.log(`✅ Welcome sent in ${member.guild.name}`);
  } catch (err) {
    console.error('❌ Failed to send welcome:', err);
  }
});

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

client.login(TOKEN);