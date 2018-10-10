//problem 1 - Kompot
function makeKompots(input) {
    let suplay = {
        cherry: 0,
        peach: 0,
        plum: 0,
        djibriKg: 0
    }
    for (const line of input) {
        let [fruit, quantity] = line.split(' ').filter(a => a !== '');
        switch (fruit) {
            case 'cherry': suplay.cherry += +quantity * 1000; break;
            case 'peach': suplay.peach += +quantity * 1000; break;
            case 'plum': suplay.plum += +quantity * 1000; break;
            default: suplay.djibriKg += +quantity; break;
        }
    }
    suplay.cherry = Math.floor(suplay.cherry / 225);
    suplay.peach = Math.floor(suplay.peach / 350);
    suplay.plum = Math.floor(suplay.plum / 200);
    suplay.djibriKg = (suplay.djibriKg * 0.2).toFixed(2);

    let result = `Cherry kompots: ${suplay.cherry}\n`;
    result += `Peach kompots: ${suplay.peach}\n`;
    result += `Plum kompots: ${suplay.plum}\n`;
    result += `Rakiya liters: ${suplay.djibriKg}`;
    return result;
}

console.log(makeKompots([ 'cherry 1.2',
'peach 2.2', 
'plum 5.2',
'peach 0.1', 
'cherry 0.2', 
'cherry 5.0', 
'plum 10',
'cherry 20.0' ,
'papaya 20' ]
));

//problem 2 - F1Race
function race(input) {
    let racers = input.shift().split(' ').filter (r => r !== '');
    for (const line of input) {
        let [command, racer] = line.split(' ').filter(t => t !== '');
        switch(command) {
            case "Join": 
            if(!racers.includes(racer)) racers.push(racer);
             break;
             case "Crash": 
            if(racers.includes(racer))
            {
                let index = racers.indexOf(racer);
                racers.splice(index, 1);
            }
             break;
             case "Overtake": 
            if(racers.includes(racer)) {
                let index = racers.indexOf(racer);
                let spliced = racers.splice(index, 1).toString();
                racers.splice(Math.max(index -1, 0), 0, spliced)
            }
             break;
             case "Pit": 
             if(racers.includes(racer)) {
                let index = racers.indexOf(racer);
                let spliced = racers.splice(index, 1).toString();
                racers.splice(Math.min(racers.length - 1, index + 1), 0, spliced);
             }
             break;
             default: 
             break;
        }
    }
    return racers.join(' ~ ');
}

console.log(race(
    ["Vetel Hamilton Slavi",
    "Pit Hamilton",
    "Overtake Vetel",
    "Crash Slavi"]
));
console.log(race(
    ["Vetel Hamilton Raikonnen Botas Slavi",
    "Pit Hamilton",
    "Overtake LeClerc",
    "Join Ricardo",
    "Crash Botas",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Crash Slavi"]    
));

//problem 3 - DNAEx
function calcGenes(input) {
    let pattern = /([a-z!@#$?]+)=([\d]+)--([\d]+)<<([a-z]+)/g;
    let organismos = new Map();
    let exec;
    for (let line of input) {
        while(exec = pattern.exec(line)) {
           let geneName = exec[1].replace(/[!@#$?]/g, '');
           let nameLength = exec[2];
           let countOfGenes = exec[3];
           let organism = exec[4];
           if(geneName && nameLength && countOfGenes && organism && geneName.length === +nameLength) {
                if(!organismos.has(organism)) {
                    organismos.set(organism, 0)
                }
                let sum = organismos.get(organism)
                organismos.set(organism, sum + +countOfGenes)
           }
        }
    }
    let result = [];
    let sortedOrganismos = Array.from(organismos.keys())
    .sort((k1, k2) => {
        return organismos.get(k2) - organismos.get(k1);
    })

    for (let key of sortedOrganismos) {
        result.push(`${key} has genome size of ${organismos.get(key)}`);
    }
    return result.join('\n');
}

console.log(calcGenes(
    [
        '!@ab?si?di!a@=7--152<<human',
        'b!etu?la@=6--321<<dog',
        '!curtob@acter##ium$=14--230<<dog',
        '!some@thin@g##=9<<human',
        'Stop!'
    ]
));

//problem 4 - F1 Championship
function calcStats(input) {
    let teams = {};
    let totalPoints = '$totalPoints$';
    for (let i = 0; i < input.length; i++) {
        let [team, pilot, points] = input[i].split(' -> ').filter(t => t !== '');
        if(!teams.hasOwnProperty(team)) {
            teams[team] = {};
            teams[team][totalPoints] = 0;
        }
        if(!teams[team].hasOwnProperty(pilot)) {
            teams[team][pilot] = 0;
        }
        teams[team][pilot] += +points;
        teams[team][totalPoints] += +points;
    }

    let result = [];
    let sortedKeys = Object.keys(teams).sort((a, b) =>
            teams[b][totalPoints] - teams[a][totalPoints])
            .slice(0, 3);
    
    for (const key of sortedKeys) {
        result.push(`${key}: ${teams[key][totalPoints]}`);

        let sortedPilots = Object.keys(teams[key])
            .filter(p => p !== totalPoints)
            .sort((a, b) =>
                teams[key][b] - teams[key][a])
            .forEach(k => result.push(`-- ${k} -> ${teams[key][k]}`))

    }

    return result.join('\n');
}

// console.log(calcStats(
//     ["Ferrari -> Kimi Raikonnen -> 25",
//     "Ferrari -> Sebastian Vettel -> 18",
//     "Mercedes -> Lewis Hamilton -> 10",
//     "Mercedes -> Valteri Bottas -> 8",
//     "Red Bull -> Max Verstapen -> 6",
//     "Red Bull -> Daniel Ricciardo -> 4"]
// ));

console.log(calcStats([
    'Ferrari -> Kimi Raikonnen -> 25',
    'Ferrari -> Sebastian Vettel -> 18',
    'Mercedes -> Lewis Hamilton -> 10',
    'Mercedes -> Valteri Bottas -> 8',
    'Red Bull -> Max Verstapen -> 6',
    'Red Bull -> Daniel Ricciardo -> 4',
    'Mercedes -> Lewis Hamilton -> 25',
    'Mercedes -> Valteri Bottas -> 18',
    'Haas -> Romain Grosjean -> 25',
    'Haas -> Kevin Magnussen -> 25'
]));
