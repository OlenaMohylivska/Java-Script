const four = 4;
const eight = 8;
const thirteen = 13;

function getAge(birth) {
    const today = new Date();
    const todaysYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todaysDate = today.getDate();
    const birthYear = birth.getFullYear();
    const birthMonth = birth.getMonth();
    const birthDate = birth.getDate();

    if (todayMonth === birthMonth) {

        if (todaysDate >= birthDate) {
            return todaysYear - birthYear;

        } else {
            return todaysYear - birthYear - 1;
        }

    } else if (todayMonth < birthMonth) {
        return todaysYear - birthYear - 1;

    } else {
        return todaysYear - birthYear;
    }
}

function getWeekDay(someDate) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(someDate);
    const indexOfday = date.getDay();

    return daysOfWeek[indexOfday];
}

function getProgrammersDay(year) {

    let fullDate = new Date();
    let dayOfMonth = 12;

    if (year % four !== 0) {
        dayOfMonth = thirteen;
    }

    fullDate.setFullYear(year, eight, `${dayOfMonth}`);

    return `${dayOfMonth} Sep, ${year} (${getWeekDay(fullDate)})`;
}

function howFarIs(weekDay) {
    const currentDate = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const indexOfCurrentDay = currentDate.getDay();
    const specifiedWeekday = weekDay[0].toUpperCase() + weekDay.slice(1);
    const indexOfSpecifiedWeekday = daysOfWeek.indexOf(specifiedWeekday);

    if (indexOfCurrentDay === indexOfSpecifiedWeekday) {
        return `Hey, today is ${specifiedWeekday} =)`;

    } else {
        let number;

        if (indexOfCurrentDay < indexOfSpecifiedWeekday) {
            number = indexOfSpecifiedWeekday - indexOfCurrentDay;

        } else {
            number = daysOfWeek.length - indexOfCurrentDay + indexOfSpecifiedWeekday;
        }

        return `It's ${number} day(s) left till ${specifiedWeekday}`;
    }
}

function isValidIdentifier(str) {
    const regExp = /^[a-zA-Z_$][\w$]*$/;

    return regExp.test(str);
}

function capitalize(str) {
    const regExp = /^(.)|\s+(.)/g;

    return str.replace(regExp, symbol => symbol.toUpperCase());
}

function isValidAudioFile(str) {
    const regExp = /^[a-zA-Z]+\.(?:mp3|flac|alac|aac)$/;

    return regExp.test(str);
}

function getHexadecimalColors(str) {
    const pattern = /#([a-f0-9]{3}){1,2}\b/gi;

    return str.match(pattern) || [];
}

function isValidPassword(password) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    return passwordPattern.test(password);
}

function addThousandsSeparators(number) {
    const string = number.toString();
    const regExp = /\B(?=(\d{3})+(?!\d))/g;

    return string.replace(regExp, ',');
}