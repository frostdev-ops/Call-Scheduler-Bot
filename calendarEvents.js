const ical = require('node-ical');
const { createClient } = require("webdav"); // webdav lib for getting/writing calendar info
const CAL_USER = process.env.CALDAV_USERNAME;
const CAL_PASS = process.env.CALDAV_PASSWORD;
const CAL_URL = process.env.CALDAV_URL;
// creates the initial connection to the webdav server and creates a client for easy future access
const client = createClient(
    CAL_URL, {
        username: CAL_USER,
        password: CAL_PASS
    }
);
exports.client = client;
/*
Think of webDAV as a directory on a web page that you can access. 
Calendar applications use this file structure to store .ics files. 
ics (or ical) files basically are formatted like json files, i.e. file{ uid[key][value], uid[key][value], ...}
*/

// This is intended to be one of a few functions that pull calendar information from the webDAV server
async function getAllEvents(msg) {
    const directoryItems = await client.getDirectoryContents("/"); // directoryItems is a list of all the files within the root directory
    console.log("total number of events: " + directoryItems.length); //debug text
    for (const file of directoryItems) { // so for each file within the root directory ...
        let filename = file["filename"];
        console.log("---------------------------");
        console.log(filename); // debug text
        let link = client.getFileDownloadLink("/" + filename); // aquire a download link
        console.log("---------------------------");
        console.log(link); // debug text
        console.log("---------------------------");
        let webEvents = await ical.async.fromURL(link); // feed download link into ical parser
        console.log(webEvents); // debug text
        console.log("---------------------------");
        for (const p in webEvents) { // for each uid within the file
            if (msg != undefined || msg != null) { // make sure msg isn't null so this command can be run anywhere, not just when prompted by a user
                msg.channel.send("Event Title: " + webEvents[p]["summary"] + // further extract only the information needed from the parsed ical data and send message to origin chat
                    "\nEvent date/time: " + webEvents[p]["start"] +
                    "\nPlanned on: " + webEvents[p]["created"]);
            }
        }
    }
}

async function getEventsByDay(msg, date) {

}

async function getNextEvent(msg) {

}

async function getEventByName(msg) {

}

async function getEventByAtendee(msg, user) {

}

async function getEventByPlannedDate(msg, date) {

}

async function getAllFutureEvents(msg, date) {

}

// export to index
module.exports = { getAllEvents, getEventsByDay, getNextEvent, getEventByName };