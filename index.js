require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const CAL_USER = process.env.CALDAV_USERNAME;
const CAL_PASS = process.env.CALDAV_PASSWORD;
const CAL_URL = process.env.CALDAV_URL;
const ical = require('node-ical');
bot.login(TOKEN);
const { createClient } = require("webdav");

const client = createClient(
    CAL_URL, {
        username: CAL_USER,
        password: CAL_PASS
    }
);
async function getContents(msg) {
    const directoryItems = await client.getDirectoryContents("/");
    var filename = directoryItems[0]["filename"]
    console.log("---------------------------")
    console.log(filename)
    var link = client.getFileDownloadLink("/" + filename)
    console.log("---------------------------")
    console.log(link)
    console.log("---------------------------")
    const webEvents = await ical.async.fromURL(link);
    console.log(webEvents)
    console.log("---------------------------")
    for (const p in webEvents) {
        if (msg != undefined || msg != null) {
            msg.channel.send("Event Title: " + webEvents[p]["summary"])
            msg.channel.send("Event date/time: " + webEvents[p]["start"])
            msg.channel.send("Planned on: " + webEvents[p]["created"])
        }
        for (const p1 in webEvents[p]) {
            console.log(p1 + ": " + webEvents[p][p1])

        }
    }
    // console.log(messsage)
}
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    getContents()
});

bot.on('message', msg => {
    if (msg.content === 'ding') {
        msg.reply('dong');

    } else if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            msg.reply('Please tag a valid user!');
        }
    } else if (msg.content.startsWith('bing')) {
        msg.reply('bong')
    } else if (msg.content.startsWith('bong')) {
        msg.reply('bing')
    } else if (msg.content.startsWith('peepee')) {
        msg.reply('poopoo')
    } else if (msg.content.startsWith('hehe')) {
        msg.reply('xD')
    } else if (msg.content.startsWith('penis')) {
        msg.reply('benis')
            .then(msg => console.log('Changed a penis to a benis'))
            .catch(console.error);
    } else if (msg.content.startsWith('benis')) {
        msg.reply('penis')
            .then(msg => console.log('Changed a benis to a penis'))
            .catch(console.error);
    } else if (msg.content.startsWith('!call')) {
        getContents(msg)
    }
});