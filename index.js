const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
// 💎 PREMIUM DONATION EMBED
const donationEmbed = new EmbedBuilder()
  .setColor(0x24042E)
  .setAuthor({
    name: 'Valley State RP',
    iconURL: 'https://cdn.discordapp.com/attachments/1481861144082645012/1493456338913726464/image.png?ex=69dfb1da&is=69de605a&hm=b227eb2f0b4ec5d3dba49e6965b5c5d9ed9cf72106cf4f60f45e88ffd7843009&'
  })
  .setTitle('💎 Valley State RP | Support & Donations')
  .setDescription(
    'Support **Valley State RP** and unlock exclusive perks, premium recognition, and special benefits while helping us grow and improve the server.\n\n' +
    '💜 Your support keeps the city alive.'
  )
  .addFields(
    {
      name: '🎁 Premium Benefits',
      value:
        '• Priority Queue Access\n' +
        '• Exclusive Discord Roles\n' +
        '• Custom Vehicles / Content\n' +
        '• VIP Recognition\n' +
        '• Special In-Game Perks'
    },
    {
      name: '🛒 How To Purchase',
      value:
        'Visit <#1492688382810394816> and choose your package.\n' +
        'All purchases are processed securely through Tebex.'
    },
    {
      name: '📦 Important Information',
      value:
        '• All purchases are **final**\n' +
        '• Perks are **non-transferable**\n' +
        '• Chargebacks = permanent ban\n' +
        '• Abuse of perks may result in removal'
    },
    {
      name: '🛠️ Need Help?',
      value:
        'Open a ticket in <#1489760434344165409> and staff will assist you.'
    }
  )
  .setThumbnail('https://cdn.discordapp.com/attachments/1481861144082645012/1493456338913726464/image.png?ex=69dfb1da&is=69de605a&hm=b227eb2f0b4ec5d3dba49e6965b5c5d9ed9cf72106cf4f60f45e88ffd7843009&')
  .setImage('https://cdn.discordapp.com/attachments/1464732183670296658/1490456748077875331/5f8d1e30-e1eb-402c-8b4c-202ed8a35ebc.png?ex=69dffd04&is=69deab84&hm=8ee53f1f6750d1317d3af2b99480379062944409433d4d238d00f7a68e63f2ee&')
  .setFooter({
    text: 'Valley State RP • Premium Support System',
    iconURL: 'https://cdn.discordapp.com/attachments/1481861144082645012/1493456338913726464/image.png?ex=69dfb1da&is=69de605a&hm=b227eb2f0b4ec5d3dba49e6965b5c5d9ed9cf72106cf4f60f45e88ffd7843009&'
  });
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
const TOKEN = process.env.TOKEN;
console.log('TOKEN exists:', !!TOKEN);

const welcomeChannels = {
  '1489760432120926228': '1489760432917844207',
  '1489874449527476224': '1489874451070849079'
};

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  const guildId = member.guild.id;

  const channelId = welcomeChannels[guildId];
  if (!channelId) return;

  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;

  let embed;

  // MAIN SERVER
  if (guildId === '1489760432120926228') {
    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('👋 Welcome to Valley State RP')
      .setDescription(
        `Welcome ${member} to **Valley State Roleplay** — a structured FiveM roleplay community built around quality, immersion, and professionalism.\n\nTo get started, follow the steps below and make sure you complete everything before jumping in.`
      )
      .addFields(
        {
          name: '📖 Step 1 • Read the Rules',
          value: 'Head over to <#1489760432917844208> and read through all community guidelines and expectations.'
        },
        {
          name: '🎭 Step 2 • Get Your Roles',
          value: 'Go to <#1489760433199120445> to select the roles and notifications you want access to.'
        },
        {
          name: '🎮 Step 3 • Learn How to Join',
          value: 'Visit <#1489791922351640637> for instructions on joining the server, getting whitelisted, and becoming part of the community.'
        },
        {
          name: '❓ Step 4 • Need Help?',
          value: 'Check <#1489792058012078090> for common questions, or use the proper support channels if you need assistance.'
        },
        {
          name: '📢 Important Channels',
          value: '• <#1489760432917844209> — Server updates and important notices\n• <#1489760433199120448> — Server status information\n• <#1489791812376858634> — General server information'
        }
      )
      .setFooter({ text: 'Valley State RP • Your Story Starts Here' });
  }

  // DEPARTMENT HUB
  else if (guildId === '1489874449527476224') {
    embed = new EmbedBuilder()
      .setColor(0x24042E)
      .setTitle('🏛️ Welcome to the Valley State Department Hub')
      .setDescription(
        `Welcome ${member} to the **Valley State RP Department Hub**.\n\nThis server is where departments recruit, advertise, process transfers, and share important internal information. Use the channels below to get started.`
      )
      .addFields(
        {
          name: '👋 Start Here',
          value: 'Check <#1489874451070849079> for the main introduction and important information.'
        },
        {
          name: '📢 Stay Updated',
          value: 'Watch <#1489874451284623366> for department updates, notices, and important announcements.'
        },
        {
          name: '✅ Review the Chain of Command',
          value: 'Read <#1489874451284623360> so you understand the department structure and who to contact.'
        },
        {
          name: '🎫 Need Assistance?',
          value: 'Use <#1489874455587979312> if you need support, have questions, or need help from staff.'
        },
        {
          name: '👮 Apply to a Department',
          value: 'Interested in joining a department? Head to <#1490187586449313983> and complete the correct application.'
        },
        {
          name: '📣 Recruitment & Advertising',
          value: 'Visit <#1489874455453896810>, <#1490190191468609687>, <#1490190235072729128>, and <#1490190278231982293> to explore open departments and current recruitment posts.'
        },
        {
          name: '💬 Important Chats',
          value: 'Use <#1490190747427668049> for general discussion and <#1489874455587979306> if you need department-related roles.'
        },
        {
          name: '🔁 Transfers',
          value: 'Looking to transfer departments? Start in <#1490195628544753868>.'
        }
      )
      .setFooter({ text: 'Valley State RP Department Hub • Stay Organized' });
  }

  if (!embed) return;

  await channel.send({ embeds: [embed] });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!donationembed') {
    await message.channel.send({ embeds: [donationEmbed] });
  }
});

client.login(TOKEN);