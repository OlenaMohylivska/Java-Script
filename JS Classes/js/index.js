class Card {
    constructor(suitName, cardRank) {
        this.suit = suitName;
        this.rank = cardRank;
        Object.defineProperty(this, 'isFaceCard', {
            value: (function (value) {
                const threeN = 13,
                    twelve = 12,
                    eleven = 11;

                switch (value) {
                    case 1: return 'Ace';
                    case threeN: return 'King';
                    case twelve: return 'Queen';
                    case eleven: return 'Jack';
                    default: return false;
                }
            })(this.rank)
        });
    }

    toString() {

        if (this.isFaceCard) {
            return `${this.isFaceCard} of ${this.suit}`;
        } else {
            return `${this.rank} of ${this.suit}`;
        }

    }
    static compare([cardOne], [cardTwo]) {
        let firstCardRank = cardOne.rank,
            secondCardRank = cardTwo.rank;
        const fourTeen = 14;

        if (cardOne.rank === 1) {
            firstCardRank = fourTeen;
        } else if (cardTwo.rank === 1) {
            secondCardRank = fourTeen;
        }

        if (firstCardRank > secondCardRank) {
            return 'Card1';
        } else if (firstCardRank === secondCardRank) {
            return 'Equal';
        }

        return 'Card2';
    }
}

class Deck {
    constructor() {
        this.cards = (function () {
            const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
            const deck = [];
            const trinadzat6 = 13

            for (let i = 0; i < suits.length; i++) {
                let suit = suits[i];
                for (let j = 1; j <= trinadzat6; j++) {
                    deck.push(new Card(suit, j));
                }
            }

            return deck;
        }());

        Object.defineProperty(this, 'count', {
            value: this.cards.length,
            writable: true
        });

        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw(n) {
        this.count -= n;
        return this.cards.splice(this.cards.length - n, n);
    }
}

class Player {
    constructor(name = 'Unknown') {
        this.name = name;
        Object.defineProperty(this, 'wins', {
            value: null,
            writable: true
        });
        this.deck = new Deck();
    }

    static play(playerOne, playerTwo) {

        for (let i = playerTwo.deck.cards.length - 1; i > 0; i--) {
            const playerOneCard = playerOne.deck.draw(1);
            const playerTwoCard = playerTwo.deck.draw(1);
            let compare = Card.compare(playerOneCard, playerTwoCard);
            switch (compare) {
                case 'Card1': playerOne.wins += 1;
                    break;
                case 'Card2': playerTwo.wins += 1;
                    break;
                default: break;
            }
        }

        if (playerOne.wins > playerTwo.wins) {

            return `${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`;
        } else if (playerOne.wins < playerTwo.wins) {

            return `${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`;
        }

        return 'Draw!!!';
    }
}

class Employee {

    constructor(name, lastName, birthday, salary, department, position) {
        this.id = new Date().getMilliseconds();
        this.firstName = name;
        this.lastName = lastName;
        this.birthday = birthday;
        this.salary = salary;
        this.position = position;
        this.department = department;
        Object.defineProperty(this, 'age', {
            value: (function (date) {
                const options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                };
                const birthDate = new Date(date).toLocaleString('utc', options);
                const now = new Date().toLocaleString('utc', options);
                const formattedNowDate = now.split('.').reverse().join('-');
                const formattedBirthDate = birthDate.split('.').reverse().join('-');
                const thousand = 1000;
                const sixty = 60;
                const twFour = 24;
                const treeHundred = 365.25;

                return Math.floor((new Date(formattedNowDate) -
                    new Date(formattedBirthDate)) / thousand / (sixty * sixty * twFour) / treeHundred);

            })(this.birthday),

            writable: true
        });
        Object.defineProperty(this, 'fullName', {
            value: `${this.firstName} ${this.lastName}`
        });
        Employee.initEmployees(this);
    }
    static initEmployees({ id, fullName, department, position }) {
        Employee.EMPLOYEES.push(
            {
                id,
                fullName,
                department,
                position
            });
    }

    quit() {
        Employee.EMPLOYEES.forEach((item, i) => {
            if (item.id === this.id) {
                Employee.EMPLOYEES.splice(i, 1);
            }
        })
    }

    retire() {
        this.quit();

        return `It was such a pleasure to work with you!`;
    }

    getFired() {
        this.quit();

        return `Not a big deal!`;
    }

    changeDepartment(newDepartment) {
        this.department = newDepartment;
    }

    changePosition(newPosition) {
        this.position = newPosition;
    }

    changeSalary(newSalary, benefit = true) {

        if (benefit) {
            this.salary += newSalary;
            return;
        }

        this.salary -= newSalary;
    }

    getPromoted(benefits) {
        for (const key in benefits) {

            if (benefits.hasOwnProperty(key)) {
                switch (key) {
                    case 'department': this.changeDepartment(benefits[key]);
                        break;
                    case 'salary': this.changeSalary(benefits[key]);
                        break;
                    case 'position': this.changePosition(benefits[key]);
                        break;
                    default: break;
                }
            }
        }

        return `Yoohooo!`;
    }

    getDemoted(punishment) {
        for (const key in punishment) {

            if (punishment.hasOwnProperty(key)) {
                switch (key) {
                    case 'department': this.changeDepartment(punishment[key]);
                        break;
                    case 'salary': this.changeSalary(punishment[key], false);
                        break;
                    case 'position': this.changePosition(punishment[key]);
                        break;
                    default: break;
                }
            }
        }

        return `Damn!`;
    }

}
Employee.EMPLOYEES = [];

class Manager extends Employee {

    constructor(name, lastName, birthday, salary, department, position = 'manager') {
        super(name, lastName, birthday, salary, department, position)

        Object.defineProperty(this, 'managedEmployees', {
            writable: true,
            value: function () {
                return Employee.EMPLOYEES.filter(item => {
                    return item.position !== 'manager' && item.department === this.department;
                })
            }.call(this)
        });
    }
}

class BlueCollarWorker extends Employee { }

class HRManager extends Manager {
    constructor(name, lastName, birthday, salary, department, position = 'manager') {
        super(name, lastName, birthday, salary, department, position)
        this.department = 'HR';
    }
}

class SalesManager extends Manager {
    constructor(name, lastName, birthday, salary, department, position = 'manager') {
        super(name, lastName, birthday, salary, department, position)
        this.department = 'sales';
    }
}

function managerPro(instance) {
    instance.promote = function (personID, benefits) {
        this.managedEmployees.forEach(item => {
            if (item.id === personID) {
                item.getPromoted(benefits);
            }
        });
    }
}
