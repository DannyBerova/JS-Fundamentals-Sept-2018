//problem 1 - Heroic Inventory
function heroicInventory(heroesArr) {
    let heroes = [];
    for (let line of heroesArr) {
        let [name, level, items] = line.split(/\s*\/\s*/);
        level = +level;
        if (items) {
            items = items.split(/\s*\,\s*/);
        } else {
            items = [];
        }        
        let hero = {name: name, level: level, items: items};
        heroes.push(hero);
    }
    return JSON.stringify(heroes);
}

console.log(heroicInventory(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara',
]));
console.log(heroicInventory(['Jake / 1000 / Gauss, HolidayGrenade']));

//problem 2 - JSON's Table
function createTable(input) {
    let output = '<table>\n';

    for (let line of input) {
        output += '\t<tr>\n';
        let token = JSON.parse(line);
        Object.entries(token).forEach(
            ([key, value]) => output +=`\t\t<td>${value}</td>\n`
        );
        output += '\t<tr>\n';
    }
    output += '</table>\n';
    return output;
}

console.log(createTable([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]))


//problem 3 - Cappy Juice
function produceBottlesOfJuice(input) {
    let bottles = new Map();
    let fruits = new Map();

    for (let line of input) {
        let [fruit, quantity] = line.split(/\s*=>\s*/);
        quantity = +quantity;
        if (fruits.has(fruit)) {
            quantity += fruits.get(fruit);
        }

        fruits.set(fruit, quantity);

        if(quantity >= 1000) {
            bottles.set(fruit, Math.floor(+quantity / 1000));
        }
    }
    let result =[];
    bottles.forEach((v, k) => { return result.push(`${k} => ${v}`)});
    return result.join('\n');
}

console.log(produceBottlesOfJuice([
    'Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549'
]));
console.log(produceBottlesOfJuice([
    'Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789'
]));

//problem 4 - Store Catalogue
function storeCatalogue(input) {
    let catalogue = new Map();

    for (let line of input) {
        let [product, price] = line.split(/\s*:\s*/);
        let groupName = product.toUpperCase()[0];

        if (!catalogue.has(groupName)) {
            catalogue.set(groupName, new Map);
        }
            
        catalogue.get(groupName).set(product,+price);
    }

    let keys = [...catalogue.keys()].sort(); 
    let result =[];
    for (let key of keys) {
        result.push(key);
        let products = [...catalogue.get(key).keys()].sort();
        for (let product of products) {
            result.push(`  ${product}: ${catalogue.get(key).get(product)}`);
        }
    }

    return result.join('\n');
}

console.log(storeCatalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]));

console.log(storeCatalogue([
    "Banana : 2",
    "Rubic's Cube : 5",
    "Raspberry P : 4999",
    "Rolex : 100000",
    "Rollon : 10",
    "Rali Car : 2000000",
    "Pesho : 0.000001",
    "Barrel : 10"
]));

//problem 5 - Auto-Engineering Company
function createRegister(input) {
    let register = new Map();

    for (const line of input) {
        let [brand, model, quantity] = line.split(/ \| /);
        quantity = +quantity;
        if(!register.has(brand)){
            register.set(brand, new Map());
            
        }
        if(!register.get(brand).has(model)) {
            register.get(brand).set(model, 0)
        }
        quantity += register.get(brand).get(model);
        register.get(brand).set(model, quantity)
    }

    let result = [];
    for (let [brand, models] of register) {
        result.push(brand);
        for (let [model, quantity] of models) {
            result.push(`###${model} -> ${quantity}`)
        }
    }
    return result.join('\n');
}

console.log(createRegister([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]));

//problem 6 - System Components
function systemComponents(input) {
    let sys = new Map();

    for (const line of input) {
        let [systemName, component, subcomponent] = line.split(/\s*\|\s*/g);
        if(!sys.has(systemName)){
            sys.set(systemName, new Map());
            
        }
        if(!sys.get(systemName).has(component)) {
            sys.get(systemName).set(component, [])
        }
        sys.get(systemName).get(component).push(subcomponent);
    }

    let result = [];
    let sortedSystems = [...sys.keys()].sort(function (a, b) {
        let compsA = [...sys.get(a).keys()];
        let compsB = [...sys.get(b).keys()];
        if (compsA.length != compsB.length) {
           return compsB.length - compsA.length; 
        }
        return a.localeCompare(b);                        
    });

    for (const syst of sortedSystems) {
        result.push(syst);
        let sortedComponents = [...sys.get(syst).keys()].sort(function (a, b) {
            let subcompsA = [...sys.get(syst).get(a)];
            let subcompsB = [...sys.get(syst).get(b)];
            return subcompsB.length - subcompsA.length; 
        });
        for (const comp of sortedComponents) {
            result.push('|||' + comp);
            for (const sub of sys.get(syst).get(comp)) {
                result.push('||||||' + sub);
            }
        }
    }
    return result.join('\n');
}

console.log(systemComponents([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]));
//problem 7 - Usernames
function usernames(input) {
    let catalogue = new Set();
    input.forEach(a => catalogue.add(a));
    let sortedNames = [...catalogue].sort((a, b) => a.length - b.length || a.localeCompare(b));
    
    return sortedNames.join('\n');
}

console.log(usernames([
    'Ashton',
    'Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston'
]));

console.log(usernames([
    'Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot'
]));

//problem 8 - *Unique Sequences
function uniqueSequences(input) {
    let uniqueSeqs = new Map();

    for (let line of input) {
        let sequence = JSON.parse(line).map(Number);
        //sort in descending order
        sequence.sort((a, b) => b - a); 
        let length = sequence.length;
        if (!uniqueSeqs.has(length)) {
            uniqueSeqs.set(length, new Set());
        }
        uniqueSeqs.get(length).add(`[${sequence.join(', ')}]`);
    }
    let lengthKeys = [...uniqueSeqs.keys()].sort((a, b) => a - b);  // ASC
    
    let result = [];
    for (let len of lengthKeys) {
        for(let seq of uniqueSeqs.get(len)) {
            result.push(seq);
        }
    }
    return result.join('\n');
}

console.log(uniqueSequences([
    '[-3, -2, -1, 0, 1, 2, 3, 4]',
    '[10, 1, -17, 0, 2, 13]',
    '[4, -3, 3, -2, 2, -1, 1, 0]'
]));

console.log(uniqueSequences([
    '[7.14, 7.180, 7.339, 80.099]',
    '[7.339, 80.0990, 7.140000, 7.18]',
    '[7.339, 7.180, 7.14, 80.099]'
]));

//problem 9 - *Arena Tier
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

//problem 10 - *Game of Epicness
function calcWinner(data, battles) {
    let kingdoms = {};
    for (let kingdomData of data) {
        let king = kingdomData.kingdom;
        let generalVal = kingdomData.general;
        let armyVal = +kingdomData.army;
        if(!kingdoms.hasOwnProperty(king)) {
            kingdoms[king] = {};
            kingdoms[king].kingdomName = king;
            kingdoms[king].wins = 0;
            kingdoms[king].losses = 0;
            kingdoms[king].generals = {};
        }

        if(!kingdoms[king].generals.hasOwnProperty(generalVal)) {
            kingdoms[king].generals[generalVal] = {};
            kingdoms[king].generals[generalVal].army = 0;
        } 
        kingdoms[king].generals[generalVal].army += armyVal;
        kingdoms[king].generals[generalVal].wins = 0;
        kingdoms[king].generals[generalVal].losses = 0;
    }

    for (let line of battles) {
        let [attackKing, attackGen, defendKing, defendGen] = line;
        let attackArmy = kingdoms[attackKing].generals[attackGen].army;
        let defendArmy = kingdoms[defendKing].generals[defendGen].army;
            
        if(attackKing !== defendKing 
            && kingdoms[attackKing].generals.hasOwnProperty(attackGen)
            && kingdoms[defendKing].generals.hasOwnProperty(defendGen)
            && attackArmy !== defendArmy) {
                if (attackArmy > defendArmy) {
                    processBattle(attackKing, attackGen, attackArmy, defendKing, defendGen, defendArmy);                    
                } else {
                    processBattle(defendKing, defendGen, defendArmy, attackKing, attackGen, attackArmy)                }
        }
    } 
    function processBattle(attackKing, attackGen, attackArmy, defendKing, defendGen, defendArmy) {
        kingdoms[attackKing].generals[attackGen].army =Math.floor(1.1 * attackArmy);
        kingdoms[attackKing].generals[attackGen].wins += 1;
        kingdoms[attackKing].wins += 1;
        kingdoms[defendKing].generals[defendGen].army =Math.max(Math.floor(0.9 * defendArmy), 0);
        kingdoms[defendKing].generals[defendGen].losses += 1;
        kingdoms[defendKing].losses += 1;

    }

    let winningKingdom = Object.values(kingdoms).sort((a, b) => b.wins - a.wins 
        || a.losses - b.losses 
        || a.kingdomName.localeCompare(b.kingdomName))[0];
    let result = [];
    result.push(`Winner: ${winningKingdom.kingdomName}`);

    let sortedGenerals = Object.keys(winningKingdom.generals).sort((a, b) => 
        winningKingdom.generals[b].army -winningKingdom.generals[a].army);

    for (let gen of sortedGenerals) {
        result.push(`/\\general: ${gen}`);
        result.push(`---army: ${winningKingdom.generals[gen]['army']}`);
        result.push(`---wins: ${winningKingdom.generals[gen]['wins']}`);
        result.push(`---losses: ${winningKingdom.generals[gen]['losses']}`);
    }
    return result.join('\n');
}

console.log(calcWinner(
[ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
  { kingdom: "Stonegate", general: "Ulric", army: 4900 },
  { kingdom: "Stonegate", general: "Doran", army: 70000 },
  { kingdom: "YorkenShire", general: "Quinn", army: 0 },
  { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
  { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
[ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
  ["Stonegate", "Ulric", "Stonegate", "Doran"],
  ["Stonegate", "Doran", "Maiden Way", "Merek"],
  ["Stonegate", "Ulric", "Maiden Way", "Merek"],
  ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]
));