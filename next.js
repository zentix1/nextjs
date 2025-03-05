import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

const TOKEN = 'YOUR_DISCORD_BOT_TOKEN';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    if (message.content.startsWith('!dm ')) {
        const msgContent = message.content.slice(4).trim();
        
        if (!msgContent) {
            return message.reply('Please provide a message to DM.');
        }
        
        try {
            await message.author.send(msgContent);
            message.reply('I have sent you a DM! ✅');
        } catch (error) {
            console.error('Error sending DM:', error);
            message.reply('I could not send you a DM. Please check your settings. ❌');
        }
    }
});

client.login(TOKEN);
