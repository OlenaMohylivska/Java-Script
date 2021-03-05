const three = 3;

const isBigger = (firstEl, secondEl) => {

    if (Number(firstEl) > Number(secondEl)) {
        return 'bigger';

    } else if (Number(firstEl) === Number(secondEl)) {
        return 'equal';

    } else {
        return 'less';
    }
}

const isEquals = (first, second) => first === second;

const numberToString = (arg) => String(arg);

const storeNames = (...args) => args;

const getDivision = (first, second) => {
    const numb = isBigger(first, second);

    if(numb === 'bigger' || numb === 'equal') {
        return first / second;
        
    } else {
        return second / first;
    }
}

const negativeCount = (array) => array.filter(item => item < 0).length;

const letterCount = (first, second) => {
    let count = 0;

    for (let char of first) {
        
        if (char === second) {
            count += 1;
        }
    }

    return count;
}

const countPoints = (array) => {
    let pointsOfMatch = 0;

    array.forEach(el => {
        const middleOfString = el.indexOf(':');
        const pointX = el.slice(0, middleOfString);
        const pointY = el.slice(middleOfString + 1);
        const result = isBigger(pointX, pointY);

        if (result === 'bigger') {
            pointsOfMatch += three;

        } else if (result === 'equal') {
            pointsOfMatch += 1;

        } else {
            pointsOfMatch += 0;
        }
    });

    return pointsOfMatch;
}
