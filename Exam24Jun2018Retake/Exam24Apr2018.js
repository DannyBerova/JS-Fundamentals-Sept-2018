//problem 1 - Gladiator Expenses
function calcExpenses(count, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let expenses = 0;

    let shieldCounter = 0;

    for (let i = 1; i <= count; i++) {
        let isSwordBroken = false;
        let isHelmetBroken = false;
        
        if (i % 2 === 0) {
            isHelmetBroken = true;
            expenses += +helmetPrice;
        }
        if (i % 3 === 0) {
            isSwordBroken = true;
            expenses += +swordPrice;
        }
        if(isHelmetBroken && isSwordBroken) {
            expenses += +shieldPrice;
            ++shieldCounter;
            if(shieldCounter % 2 === 0 && shieldCounter !== 0 && i !== 1) {
                expenses += +armorPrice;
            }
        }
        
    }

    return `Gladiator expenses: ${expenses.toFixed(2)} aureus`
}
console.log(calcExpenses(
    23,
12.50,
21.50,
40,
200
))

//problem 2 - Gladiator Inventory
function inventory(input) {
    let equipment = input[0].split(' ').filter(e => e !== '');
    let commands = input.slice(1);
    for (let command of commands) {
        let [comm, item] = command.split(' ').filter(t => t !== '');
        
        switch(comm) {
            case 'Buy': 
            if(!equipment.includes(item)) {
                equipment.push(item);
            };
            break;
            case 'Trash': 
            if(equipment.includes(item)) {
                let ind = equipment.indexOf(item);
                equipment.splice(ind,1);
            }
            break;
            case 'Repair': 
            if(equipment.includes(item)) {
                let ind = equipment.indexOf(item);
                let itemToRepair = equipment.splice(ind, 1,)[0];
                equipment.push(itemToRepair);
            }
            break;
            case 'Upgrade': 
            let [it, upgr] = item.split('-');
            if(equipment.includes(it)) {
                let ind = equipment.indexOf(it);
                let itemToRepair = it + ':' + upgr;
                equipment.splice(ind+1,0, itemToRepair);
                
            } 
            break;
            default: break ;
        }
    }

    return equipment.join(' ');
}

console.log(inventory(
['SWORD Shield Spear',
    'Buy Bag',
   'Trash Shield',
    'Repair Spear',
    'Upgrade SWORD-Steel',
    'Fight!'
    ]
));
console.log(inventory(
    ['SWORD Shield Spear',
        'Trash Bow',
        'Repair Shield',
        'Upgrade Helmet-V',
        'Fight!'
        ]
    ));

//problem 3 - Ancient vs Memory
function decodeCode(input) {
    let joined = input.join(' ').split('32656 19759 32763').filter(j => j !== '');
    let result = [];
    for (const word of joined) {
        let tokens = word.trim().split(' ').filter(t => t !== '');
        let length = +tokens[1];
        let decoded = tokens.splice(3, length).map(l => String.fromCharCode(l)).join('').trim();
        if(decoded !== '' && decoded.length === length) {
            result.push(decoded);
        }
    }
    return result.join('\n').trim()
}

console.log(decodeCode([
    '32656 19759 32763 0 5 0 80 101 115 104 111 0 0 0 0 0 0 0 0 0 0 0',
'0 32656 19759 32763 0 7 0 83 111 102 116 117 110 105 0 0 0 0 0 0 0 0'
]));
console.log(decodeCode(
    [
        '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0',
'5 0 71 111 115 104 111 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 4 0',
'75 105 114 111 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 8 0 86 101',
'114 111 110 105 107 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0'

    ]));

//problem 4 - Arena Tier
function arenaTier(input) {
    let pool = {};
    let totalScore = '%totalScore%';
    for (let line of input) {
        if(line.includes('->')){
            let [name, technique, score] = line.split(/ -> /);

            if(!pool.hasOwnProperty(name)) {
                pool[name] = {};
                pool[name][totalScore] = 0;
            }

            if(!pool[name].hasOwnProperty(technique)) {
                 pool[name][technique] = +score;
                 pool[name][totalScore] += +score
            } else {
                if(pool[name][technique] < +score) {
                    let previousScore = pool[name][technique];
                    pool[name][technique] = +score;
                    pool[name][totalScore] += +score - previousScore;
                }
            }
        } else if (line.includes(' vs ')) {
            let [firstGl, secondGl] = line.split(/ vs /);
            let first = pool[firstGl];
            let second = pool[secondGl];

            if(pool.hasOwnProperty(firstGl) && pool.hasOwnProperty(secondGl)) {
                let found = false
                Object.keys(first)
                    .forEach((key) => {
                        if(found) {
                            return;
                        }
                        if( key !== totalScore && pool[secondGl].hasOwnProperty(key)) {
                           if(first[totalScore] > second[totalScore]) {
                               delete pool[secondGl];
                               found = true;
                            } else if(first[totalScore] < second[totalScore]) {
                                delete pool[firstGl];
                                found = true;
                            }
                        }
                    });
            } else {
                break;
            }
        } else {
            break;
        }
    }

    let sortedKeys = Object
                    .keys(pool)
                    .sort((a, b) => 
                        pool[b][totalScore] - pool[a][totalScore] || a.localeCompare(b));

    let result = [];
    for (const key of sortedKeys) {
        result.push(`${key}: ${ pool[key][totalScore]} skill`)

        let sortedTechiques = Object
                .keys(pool[key])
                .filter(t => t != totalScore)
                .sort((a, b) => 
                    +pool[key][b] - +pool[key][a] || a.localeCompare(b));

        for (const tech of sortedTechiques) {
            result.push(`- ${tech} <!> ${pool[key][tech]}` )
        }
    }

    return result.join('\n');
}

console.log(arenaTier([
    'Pesho -> BattleCry -> 400',
    'Gosho -> PowerPunch -> 300',
    'Stamat -> Duck -> 200',
    'Stamat -> Tiger -> 250',
    'Ave Cesar'
]));
console.log(arenaTier([
    'Pesho -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Pesho vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Gosho',
    'Ave Cesar'
]));