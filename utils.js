class Event {
    users = new Map();
    title = new String();
    date = new Date();
    description = new String();
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    addUser(user, status) {
        this.users.set(user, status);
    }

    removeUser(user) {
        this.users.delete(user);
    }

    updateUser(user, status) {
        this.users.set(user, status);
    }

    changeDate(date) {
        this.date = date;
    }

    changeTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }
}

class ParsedDate {
    day = new String();
    month = new String();
    year = new String();
    hour = new String();
    minute = new String();
    AM_PM = new String();

    constructor(day, month, year, hour, minute, night_day) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minute = minute;
        this.AM_PM = night_day;
    }
}

class User {
    eventsJoined;
    discord_id = new String();
}

function parseDate(date) {
    // parse day (always starts with day)
    const day;
    switch (date.charAt(0)) {
        case 'F':
            day = 'Friday';
            break;
        case 'M':
            day = 'Monday';
            break;
        case 'W':
            day = 'Wednesday';
        case 'T':
            if (date.charAt(1) == 'h') {
                day = 'Thursday';
            } else {
                day = 'Tuesday';
            }
            break;
        case 'S':
            if (date.charAt(1) == 'a') {
                day = 'Saturday';
            } else {
                day = 'Sunday';
            }
            break;
    }
    // parse month (always starts 5 chars into string)
    /*
    A: April, August
    D: December
    F: February
    J: June, July, January
    M: May, March
    N: November
    O: October
    S: September
    */
    const month;
    switch (date.charAt(4)) {
        case 'A':
            if (date.charAt(5) == 'p') {
                month = 'April';
            } else {
                month = 'August';
            }
            break;
        case 'D':
            month = 'December';
        case 'F':
            month = 'Feburary';
        case 'J':
            if (date.charAt(5) == 'a') {
                month = 'January';
            } else if (date.charAt(6) == 'n') {
                month = 'June';
            } else {
                month = 'July';
            }
            break;
        case 'M':
            if (date.charAt(6) == 'y') {
                month = 'May';
            } else {
                month = 'March';
            }
            break;
        case 'N':
            month = 'November';
        case 'O':
            month = 'October';
        case 'S':
            month = 'September';
    }
    // parse day
    const day = date.charAt(8) + date.chatAt(9);
    // parse year
    const year = date.charAt(11) + date.chatAt(12) + date.charAt(13) + date.chatAt(14);
    // parse hour
    let hour = date.charAt(16) + date.chatAt(17);
    // parse minute
    const minute = date.charAt(19) + date.chatAt(20);
    const ampm;
    // convert hour to 12 hour format if needed
    if (hour > 12) {
        ampm = 'AM';
        hour = hour - 12;

    } else if (hour <= 12) {
        ampm = 'PM';
    }

    return new ParsedDate(day,
        month,
        year,
        hour,
        minute,
        ampm
    )
}

function parseUser(user) {

}

function storeUser(user) {

}

function updateUser(user) {

}

function deleteUser(user) {

}

function cacheEvent(Event) {

}

module.exports = { Event, ParsedDate, parseDate, parseUser, storeUser, updateUser, deleteUser };