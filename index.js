require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const readline = require('readline'); // added for example shown later
const { getAllEvents, getEventsByDay } = require("./calendarEvents");
// ah, yes. a prefix is usually a good idea. Let's move it to the .env file for continuity's sake tho ;)
let prefix = process.env.PREFIX; // command prefix

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    getAllEvents();
});

// added for example shown later
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

bot.on('message', msg => {

    /* here we divide the commands and phrases. saves a teeny bit of memory
       and just organizes things a little neatly. */

    // COMMAND SECTION
    if (msg.content.startsWith(prefix)) {
        let cmd = msg.content.substr(1); // command without prefix

        if (cmd.startsWith('call')) {
            getAllEvents(msg);
        } else if (cmd.startsWith('kick ')) {
            if (msg.mentions.users.size) {
                const taggedUser = msg.mentions.users.first();
                msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
            } else {
                msg.reply('Please tag a valid user!');
            }
        }

        // cuz why not lel
        if (cmd.startsWith('8b')) {
            if (cmd.substr(2).length > 1) {
                let ball = Math.floor(Math.random() * 20);
                switch (ball) {
                    case 0:
                        msg.channel.send('It is certain.');
                        break;
                    case 1:
                        msg.channel.send('It is decidedly so.');
                        break;
                    case 2:
                        msg.channel.send('Without a doubt.');
                        break;
                    case 3:
                        msg.channel.send('Yes - definitely.');
                        break;
                    case 4:
                        msg.channel.send('You may rely on it.');
                        break;
                    case 5:
                        msg.channel.send('As I see it, yes.');
                        break;
                    case 6:
                        msg.channel.send('Most likely.');
                        break;
                    case 7:
                        msg.channel.send('Outlook good.');
                        break;
                    case 8:
                        msg.channel.send('Yes.');
                        break;
                    case 9:
                        msg.channel.send('Signs point to yes.');
                        break;
                    case 10:
                        msg.channel.send('Reply hazy, try again.');
                        break;
                    case 11:
                        msg.channel.send('Ask again later.');
                        break;
                    case 12:
                        msg.channel.send('Better not tell you now.');
                        break;
                    case 13:
                        msg.channel.send('Cannot predict now.');
                        break;
                    case 14:
                        msg.channel.send('Concentrate and ask again.');
                        break;
                    case 15:
                        msg.channel.send(`Don't count on it.`);
                        break;
                    case 16:
                        msg.channel.send('My reply is no.');
                        break;
                    case 17:
                        msg.channel.send('My sources say no.');
                        break;
                    case 18:
                        msg.channel.send('Outlook not so good.');
                        break;
                    case 19:
                        msg.channel.send('Very doubtful.');
                }
                console.log(msg.author.username + ' ran 8ball, got result ' + (ball + 1) + ' out of 20.');
            } else {
                msg.channel.send('Ask a question silly!');
            }
        }
    }
});

// HOST SECTION (just a quick and fun example of running commands directly from server)
rl.on('line', (input) => {
    let inputArgs = input.split(/ +/g);
    if (inputArgs[0] == 'msg' && input.length > 21) {
        let message = input.substring(22);
        bot.channels.get(inputArgs[1]).send(message);
        console.log('Message sent!');
    }
});

bot.login(TOKEN);