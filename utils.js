class Event {
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
    constructor(week_day, Day, Month, Year, Hour, Minute, Night_day) {
        this.d = Day;
        this.m = Month;
        this.y = Year;
        this.h = Hour;
        this.min = Minute;
        this.ampm = Night_day;
        this.wd = week_day;
    }
    get day() {
        return this.d;
    }
    get weekday() {
        return this.wd;
    }
    get month() {
        return this.m;
    }
    get hour() {
        return this.h;
    }
    get minute() {
        return this.min;
    }
    get AM_PM() {
        return this.ampm;
    }
    get year() {
        return this.y;
    }
}

class User {}

async function parseDate(date) {
    stringDate = await date.toString();
    // parse day (always starts with day)
    let weekday = new String();
    switch (stringDate.charAt(0)) {
        case 'F':
            weekday = 'Friday';
            break;
        case 'M':
            weekday = 'Monday';
            break;
        case 'W':
            weekday = 'Wednesday';
        case 'T':
            if (stringDate.charAt(1) == 'h') {
                weekday = 'Thursday';
            } else {
                weekday = 'Tuesday';
            }
            break;
        case 'S':
            if (stringDate.charAt(1) == 'a') {
                weekday = 'Saturday';
            } else {
                weekday = 'Sunday';
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
    var month = new String();
    switch (stringDate.charAt(4)) {
        case 'A':
            if (stringDate.charAt(5) == 'p') {
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
            if (stringDate.charAt(5) == 'a') {
                month = 'January';
            } else if (stringDate.charAt(6) == 'n') {
                month = 'June';
            } else {
                month = 'July';
            }
            break;
        case 'M':
            if (stringDate.charAt(6) == 'y') {
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
    day =
        stringDate.charAt(8) +
        stringDate.charAt(9);
    // parse year
    var year =
        stringDate.charAt(11) +
        stringDate.charAt(12) +
        stringDate.charAt(13) +
        stringDate.charAt(14);
    // parse hour
    let hour =
        stringDate.charAt(16) +
        stringDate.charAt(17);
    // parse minute
    var minute =
        stringDate.charAt(19) +
        stringDate.charAt(20);
    var ampm = new String();
    // convert hour to 12 hour format if needed
    if (hour > 12) {
        ampm = 'AM';
        hour = hour - 12;

    } else if (hour <= 12) {
        ampm = 'PM';
    }

    return new ParsedDate(
        weekday,
        day,
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