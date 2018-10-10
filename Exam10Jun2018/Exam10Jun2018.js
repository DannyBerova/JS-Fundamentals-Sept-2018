//problem 1 - Travel Plans
function calcTotalGold(input) {
    let specialized = ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing'];
    let average = ['Driving', 'Managing', 'Fishing', 'Gardening'];
    let clumsy = ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting', 'Writing', 'Lecturing', 'Modeling', 'Nursing'];
    let specializedCounter = 1;
    let clumsyCounter = 1;
    let sum = 0;

    for (const line of input) {
        let [proffesion, gold] = line.split(' : ').filter(t => t !== '');
        proffesion = proffesion.trim();
        if(specialized.includes(proffesion) && gold < 200){
            continue;
        }
        if (specialized.includes(proffesion)) {
            sum += +gold * 0.8;
            if (specializedCounter % 2 === 0) {
                sum += 200;
            }
            specializedCounter++;
        }
        if(average.includes(proffesion)) {
            sum += +gold;
        }
        if(clumsy.includes(proffesion)) {
            if(clumsyCounter % 2 === 0){
                gold = +gold * 0.95;
            } else if (clumsyCounter % 3 === 0) {
                gold = +gold * 0.9;
            }
            sum += +gold;
            clumsyCounter++;
        }
    }
    let result = [];
    result.push(`Final sum: ${sum.toFixed(2)}`);
    if(sum < 1000) {
        result.push(`Mariyka need to earn ${(1000 - sum).toFixed(2)} gold more to continue in the next task.`)
    } else  {
        result.push(`Mariyka earned ${(sum - 1000).toFixed(2)} gold more.`)
    }
    return result.join('\n');
}

console.log(calcTotalGold(
    ["Programming : 500", "Driving : 243", "Singing : 100", "Cooking : 199"]
));
console.log(calcTotalGold(
    ["Programming : 500", "Driving : 243.55", "Acting : 200", "Singing : 100", "Cooking : 199", "Hardware maintenance : 800", "Gardening : 700", "Programming : 500"]
));
console.log(calcTotalGold(
    ["Programming : 199"]
));
console.log(calcTotalGold(
    ["Driving : 1000"]
));

//problem 2 - Travel Investigation
function findValidInvalid(input) {
    let delimeter = input[1];
    let companies = input[0].split(delimeter);
    let sentences = input.slice(2);
    let valid = [];
    let invalid = [];
    
    for (let sentence of sentences) {
        sentence = sentence.toLowerCase();
        let isValid = true;
        for (const company of companies) {
            if (!sentence.includes(company)) {
                isValid = false;
            }
        }
        if (isValid) {
            valid.push(`${valid.length + 1}. ${sentence}`)
        } else {
            invalid.push(`${invalid.length + 1}. ${sentence}`)
        }
    }
    let result = [];
    if(valid.length > 0) {
        result.push('ValidSentences')
        result.push(valid.join('\n'));
    }
    if(valid.length > 0 && invalid.length > 0) {
        result.push('==============================');
    }
    if(invalid.length > 0) {
        result.push('InvalidSentences')
        result.push(invalid.join('\n'));
    }

    return result.join('\n');
}

console.log(findValidInvalid(
    ["bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
    "someone continues as no "]
));
console.log(findValidInvalid(
    ["bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho  e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "We will koftipochivkaLTD travel e expenses no MinkaTrans mu e BulgariaTour",
    "dqdo BuLGariaTOUR mraz some text but is KoftiPochivkaLTD minkaTRANS"]
));

//problem 3 - Minke, Decode
function decode(input) {
    let firstInd = +input[0];
    let secondInd = +input[1];
    let replacement = input[2];
    let rest = input[3];

    let match = rest.match(/\b[A-Z][a-z]+[A-Z]\b/);
    let chunk = match[0].substring(firstInd, secondInd + 1);
    let result = match[0].replace(chunk,replacement).toLowerCase();
    let capitalized = result[0].toUpperCase() + result.substring(1);
    
    let nums = [...rest.match(/[\d]{3}(\.[\d]+)*/g)]
        .map(n => Math.ceil(+n))
        .map(el => String.fromCharCode(el))
        .join('');
    let text = nums[0].toUpperCase() + nums.substring(1);

    return capitalized + ' => ' + text;
}

console.log(decode(
    ["3", "5", "gar","114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]
));
console.log(decode(
    ["1", "4","loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"]
));

//problem 4 - Travel Time
function organize(input) {
    let world = {};
    for (const line of input) {
        let [country, townInp, cost] = line.split(' > ').filter(t => t !== '');
        let town = townInp[0].toUpperCase() + townInp.substring(1);
        if(!world.hasOwnProperty(country)) {
            world[country] = {};
        }

        if(!world[country].hasOwnProperty(town)) {
            world[country][town] = +cost;
        } else {
            if (world[country][town] > +cost) {
                world[country][town] = +cost;
            }
        }
    }
    let result = []
    let sortedCountries = [...Object.keys(world)].sort((a,b) => a.localeCompare(b));
    for (const country of sortedCountries) {
        let sortedTowns = [...Object.keys(world[country])]
            .sort((a,b) => world[country][a] - world[country][b])
            .map(t =>  t + ' -> ' + world[country][t])
            .join(' ');

        result.push(`${country} -> ${sortedTowns}`);
    }
    return result.join('\n');
}

console.log(organize(
    ["Bulgaria > sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > tirana > 1000",
    "Bulgaria > Sofia > 200" ]
));