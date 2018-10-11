//problem 1 - Bitcoin Mining
function mining(input) {
    let bitkoins = 0;
    let dayFirstBitcoin = 0;
    let bitkoinRate = 11949.16;
    let goldRate = 67.51;
    let gold = 0;
    let isBought = false;

    for (let i = 1; i <= input.length; i++) {
        let dayOre = +input[i-1];
        if(i % 3 === 0) {
            dayOre = dayOre * 0.7;
        }

        gold += (dayOre * goldRate);
        if(gold / bitkoinRate > 1) {
            if(!isBought) {
                dayFirstBitcoin = i;
                isBought = true;
            }
            bitkoins += Math.floor(gold / bitkoinRate);
            gold = gold % bitkoinRate;
        }
    }

    let result = [];
    result.push(`Bought bitcoins: ${bitkoins}`);
    dayFirstBitcoin > 0 ? result.push(`Day of the first purchased bitcoin: ${dayFirstBitcoin}`) : '';
    result.push(`Left money: ${gold.toFixed(2)} lv.`);
    return result.join('\n');
}

console.log(mining([
    '100', '200', '300'
]));

console.log(mining([
    '3124.15', '504.212', '2511.124'
]));

//problem 2 - Air Pollution
function calcPollution(matrixInput, forcesArr) {
    let matrix = [];
    for (const line of matrixInput) {
        matrix.push(line.split(' ').map(Number).filter(t => t !== ''));
    }

    for (const forceTokens of forcesArr) {
        let [force, index] = forceTokens.split(' ').filter(t => t !== '');
        index = +index;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if(force === 'breeze') {
                    if(i == index) {
                        matrix[i][j] = Math.max(matrix[i][j]-15, 0);
                    }
                } else if (force === 'gale') {
                    if(j == index) {
                        matrix[i][j] = Math.max(matrix[i][j]-20, 0);
                    }
                } else if (force === 'smog') {
                    matrix[i][j] += index;
                }
            }
        }
    }
    let poluted = [];
    for (let i = 0; i < matrix.length; i++) {
       for (let j = 0; j < matrix.length; j++) {
           if(matrix[i][j] >= 50) {
               poluted.push(`[${i}-${j}]`);
           }
       }
    }
    let result = '';
    poluted.length > 0 ? result += `Polluted areas: ${poluted.join(', ')}` : result +='No polluted areas';

    return result;
}

console.log(calcPollution(
    [
        "5 7 72 14 4",
        "41 35 37 27 33",
        "23 16 27 42 12",
        "2 20 28 39 14",
        "16 34 31 10 24",
      ],
      ["breeze 1", "gale 2", "smog 25"]
      
));

//problem 3 - Survey Parser
function parseDocument(input) {
    let outside = /<svg>(.*)<\/svg>/;
    if(input.match(outside)) {
        let sections = /<svg>.*<cat><text>.*\[(.+)\].*<\/text><\/cat>.*<cat>(.+)<\/cat>.*<\/svg>/g.exec(input);
        if(sections && sections[1] && sections[2]) {
            let surveyLabel = sections[1];
            let pattern2 = sections[2];
            
            let ratingsReg = /<g><val>(-{0,1}\d+)<\/val>(-{0,1}\d+)<\/g>/g;

            if(pattern2.match(ratingsReg)) {
                let exec;
                let surveyCount = 0;
                let sumRatings = 0;
                while (exec = ratingsReg.exec(pattern2)){
                    if (exec[1] >= 1 && exec[1] <= 10 && exec[2] >= 0 && exec[2] <= 1000000) {
                        sumRatings += (+exec[1] * +exec[2]);
                        surveyCount += +exec[2];
                    }
                }
                    if (surveyCount === 0) {
                        console.log(`${surveyLabel}: `);
                        return;
                    } 
                    let avgRating = sumRatings / surveyCount;
                    console.log(`${surveyLabel}: ${+avgRating.toFixed(2)}`);
                    return;
                
            } else {
                console.log('Invalid format');
                    return;
            }
        } else {
            console.log('Invalid format');
            return;
        }

    } else {
        console.log('No survey found');
    }
}

function printServey(inputText) {
    if (!/<svg>.*<\/svg>/gm.exec(inputText)) {
        console.log('No survey found');
        return;
    }

    let pattern = /<svg>.*?<cat>.*?<text>.*?\[(.+)\].*?<\/text>.*?<\/cat>.*?<cat>(.+)<\/cat><\/svg>/gm;
    let match = pattern.exec(inputText);
    if (!match) {
        console.log('Invalid format');
        return;
    }

    let label = match[1];
    let votesCount = 0;
    let totalVotes = 0;
    let matches = inputText.match(/<g><val>(-{0,1}[0-9]+)<\/val>(-{0,1}[0-9]+)<\/g>/gm);
    for (const line of matches) {
        let currentVote = /<val>(-{0,1}[0-9]+)<\/val>(-{0,1}[0-9]+)/gm.exec(line);

        let value = Number(currentVote[1]);
        let count = Number(currentVote[2]);

        if (value < 1 || value > 10 || 
            count < 1 || count > 1000000) {
            continue;
        }

        votesCount += count;
        totalVotes += value * count;
    }

    if (votesCount === 0) {
        console.log(`${label}: `);
        return;
    } 

    let votesAverage = precisionRound(totalVotes * 1.0 / votesCount, 2);

    console.log(`${label}: ${votesAverage}`);

    function precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
}

printServey(
    `<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>`
);

parseDocument(
    '<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>'
);
parseDocument(
    '<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>'
);
parseDocument(
    '<p>How do you suggest we improve our service?</p><p>More tacos.</p><p>It\'s great, don\'t mess with it!</p><p>I\'d like to have the option for delivery</p>'
);
parseDocument(
    '<svg><cat><text>Which is your favourite meal from our selection?</text></cat><cat><g><val>Fish</val>15</g><g><val>Prawns</val>31</g><g><val>Crab Langoon</val>12</g><g><val>Calamari</val>17</g></cat></svg>'
);


//problem 4 - Game of Epicness
// function calcWinner(data, battles) {
//     let kingdoms = {};
//     for (let kingdomData of data) {
//         let king = kingdomData.kingdom;
//         let generalVal = kingdomData.general;
//         let armyVal = +kingdomData.army;
//         if(!kingdoms.hasOwnProperty(king)) {
//             kingdoms[king] = {};
//             kingdoms[king].kingdomName = king;
//             kingdoms[king].wins = 0;
//             kingdoms[king].losses = 0;
//             kingdoms[king].generals = {};
//         }

//         if(!kingdoms[king].generals.hasOwnProperty(generalVal)) {
//             kingdoms[king].generals[generalVal] = {};
//             kingdoms[king].generals[generalVal].army = 0;
//         } 
//         kingdoms[king].generals[generalVal].army += armyVal;
//         kingdoms[king].generals[generalVal].wins = 0;
//         kingdoms[king].generals[generalVal].losses = 0;
//     }

//     for (let line of battles) {
//         let [attackKing, attackGen, defendKing, defendGen] = line;
//         let attackArmy = kingdoms[attackKing].generals[attackGen].army;
//         let defendArmy = kingdoms[defendKing].generals[defendGen].army;
            
//         if(attackKing !== defendKing 
//             && kingdoms[attackKing].generals.hasOwnProperty(attackGen)
//             && kingdoms[defendKing].generals.hasOwnProperty(defendGen)
//             && attackArmy !== defendArmy) {
//                 if (attackArmy > defendArmy) {
//                     processBattle(attackKing, attackGen, attackArmy, defendKing, defendGen, defendArmy);                    
//                 } else {
//                     processBattle(defendKing, defendGen, defendArmy, attackKing, attackGen, attackArmy)                }
//         }
//     } 
//     function processBattle(attackKing, attackGen, attackArmy, defendKing, defendGen, defendArmy) {
//         kingdoms[attackKing].generals[attackGen].army =Math.floor(1.1 * attackArmy);
//         kingdoms[attackKing].generals[attackGen].wins += 1;
//         kingdoms[attackKing].wins += 1;
//         kingdoms[defendKing].generals[defendGen].army =Math.max(Math.floor(0.9 * defendArmy), 0);
//         kingdoms[defendKing].generals[defendGen].losses += 1;
//         kingdoms[defendKing].losses += 1;

//     }

//     let winningKingdom = Object.values(kingdoms).sort((a, b) => b.wins - a.wins 
//         || a.losses - b.losses 
//         || a.kingdomName.localeCompare(b.kingdomName))[0];
//     let result = [];
//     result.push(`Winner: ${winningKingdom.kingdomName}`);

//     let sortedGenerals = Object.keys(winningKingdom.generals).sort((a, b) => 
//         winningKingdom.generals[b].army -winningKingdom.generals[a].army);

//     for (let gen of sortedGenerals) {
//         result.push(`/\\general: ${gen}`);
//         result.push(`---army: ${winningKingdom.generals[gen]['army']}`);
//         result.push(`---wins: ${winningKingdom.generals[gen]['wins']}`);
//         result.push(`---losses: ${winningKingdom.generals[gen]['losses']}`);
//     }
//     return result.join('\n');
// }

// console.log(calcWinner(
// [ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
//   { kingdom: "Stonegate", general: "Ulric", army: 4900 },
//   { kingdom: "Stonegate", general: "Doran", army: 70000 },
//   { kingdom: "YorkenShire", general: "Quinn", army: 0 },
//   { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
//   { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
// [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
//   ["Stonegate", "Ulric", "Stonegate", "Doran"],
//   ["Stonegate", "Doran", "Maiden Way", "Merek"],
//   ["Stonegate", "Ulric", "Maiden Way", "Merek"],
//   ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]
// ));