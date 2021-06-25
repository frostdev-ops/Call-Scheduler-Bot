require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const CAL_USER = process.env.CALDAV_USERNAME;
const CAL_PASS = process.env.CALDAV_PASSWORD;
const CAL_URL = process.env.CALDAV_URL;
const ical = require('node-ical');
const { createClient } = require("webdav");
const readline = require('readline'); // added for example shown later

const client = createClient(
    CAL_URL, {
        username: CAL_USER,
        password: CAL_PASS
    }
);

let prefix = '!'; // command prefix

/* I would try organizing this but I have no idea what's going on tbh so I'm just
   gonna not xd. It seems like you've got a variety of varible types here so I'm
   assuming you have this figured out to a degree, but make sure to use var, const,
   and let according to your needs. */
async function getContents(msg) {
    const directoryItems = await client.getDirectoryContents("/");
    var filename = directoryItems[0]["filename"];
    console.log("---------------------------");
    console.log(filename);
    var link = client.getFileDownloadLink("/" + filename);
    console.log("---------------------------");
    console.log(link);
    console.log("---------------------------");
    const webEvents = await ical.async.fromURL(link);
    console.log(webEvents);
    console.log("---------------------------");
    for (const p in webEvents) {
        if (msg != undefined || msg != null) {
            msg.channel.send("Event Title: " + webEvents[p]["summary"] + 
                           "\nEvent date/time: " + webEvents[p]["start"] + 
                           "\nPlanned on: " + webEvents[p]["created"]);
        }
        for (const p1 in webEvents[p]) {
            console.log(p1 + ": " + webEvents[p][p1]);
        }
    }
    // console.log(messsage)
}
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    getContents();
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
            getContents(msg);
        }

        else if (cmd.startsWith('kick ')) {
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
                switch(ball) {
                    case 0: msg.channel.send('It is certain.'); break;
                    case 1: msg.channel.send('It is decidedly so.'); break;
                    case 2: msg.channel.send('Without a doubt.'); break;
                    case 3: msg.channel.send('Yes - definitely.'); break;
                    case 4: msg.channel.send('You may rely on it.'); break;
                    case 5: msg.channel.send('As I see it, yes.'); break;
                    case 6: msg.channel.send('Most likely.'); break;
                    case 7: msg.channel.send('Outlook good.'); break;
                    case 8: msg.channel.send('Yes.'); break;
                    case 9: msg.channel.send('Signs point to yes.'); break;
                    case 10: msg.channel.send('Reply hazy, try again.'); break;
                    case 11: msg.channel.send('Ask again later.'); break;
                    case 12: msg.channel.send('Better not tell you now.'); break;
                    case 13: msg.channel.send('Cannot predict now.'); break;
                    case 14: msg.channel.send('Concentrate and ask again.'); break;
                    case 15: msg.channel.send(`Don't count on it.`); break;
                    case 16: msg.channel.send('My reply is no.'); break;
                    case 17: msg.channel.send('My sources say no.'); break;
                    case 18: msg.channel.send('Outlook not so good.'); break;
                    case 19: msg.channel.send('Very doubtful.');
                }
                console.log(msg.author.username + ' ran 8ball, got result ' + (ball + 1) + ' out of 20.');
            } else {
                msg.channel.send('Ask a question silly!');
            }
        }
    }

    // PHRASE SECTION
    /* (typically you don't want a bot looking for non-command related text,
       since it virtually requires you to check all messages, but since bots
       are pretty lightweight and we are only using this in a couple servers
       it probably doesn't matter too much) */
    else {

        if (msg.content.startsWith('bing')) {
            msg.reply('bong');
        }

        else if (msg.content.startsWith('bong')) {
            msg.reply('bing');
        }

        else if (msg.content === 'ding') {
            msg.reply('dong');
        } 

        else if (msg.content.startsWith('hehe')) {
            msg.reply('xD');
        }

        else if (msg.content.startsWith('peepee')) {
            msg.reply('poopoo');
        }

        else if (msg.content.startsWith('penis')) {
            msg.reply('benis');
            console.log('Changed a penis to a benis'); // this command is pretty much bug-proof, you don't need a catch for it.
        }

        else if (msg.content.startsWith('benis')) {
            msg.reply('penis');
            console.log('Changed a benis to a penis'); // so is this one ^
        }
    }
});

// HOST SECTION (just a quick and fun example of running commands directly from server)
rl.on('line', (input) => {
    let inputArgs = input.split(/ +/g);
    if(inputArgs[0] == 'msg' && input.length > 21) {
        let message = input.substring(22);
        bot.channels.get(inputArgs[1]).send(message);
        console.log('Message sent!');
    }   
  });

bot.login(TOKEN);