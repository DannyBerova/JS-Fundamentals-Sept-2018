//problem 1 - Followers
function processUsers(input) {
    let website = {};
    for (const line of input) {
        let tokens = line.split(/Welcome, | followed /g).filter(t => t !== '');
        if (tokens.length === 1 && line.includes('Welcome,')){
            if(!website.hasOwnProperty(tokens[0])) {
                website[tokens[0].trim()] = {};
                website[tokens[0].trim()].following = [];
                website[tokens[0].trim()].followers = [];
            }
        } else if( tokens.length === 2 && line.includes('followed')) {
            let follower = tokens[0].trim();
            let user = tokens[1].trim();
            if (follower && user && website.hasOwnProperty(follower) &&
                website.hasOwnProperty(user) &&
                ! website[user].followers.includes(follower) &&
                ! website[follower].following.includes(user) &&
                follower != user) {
                website[follower].following.push(user);
                website[user].followers.push(follower);
            }
        } else {

        }
    }

    let sortedUsers = Object.keys(website).sort((u1, u2) =>
            website[u2].followers.length - website[u1].followers.length || u2.localeCompare(u1));

    let counter = 0;
    let result = [];
    result.push(`Total users registered: ${Object.keys(website).length}`)
    for (const key of sortedUsers) {
        counter++;
        result.push(`${counter}. ${key} : ${website[key].following.length} following, ${website[key].followers.length} followers`)
        if (sortedUsers.indexOf(key) === 0) {
            website[key].followers
                .sort()
                .forEach(f => result.push(`*  ${f}`)
                );
        }
    }

    return result.join('\n');
}

console.log(processUsers(
    [
    'Welcome, JennaMarbles',
    'JennaMarbles followed Zoella',
    'Welcome, AmazingPhil',
    'JennaMarbles followed AmazingPhil',
    'Welcome, Zoella',
    'Welcome, JennaMarbles',
    'Zoella followed AmazingPhil',
    'Christy followed Zoella',
    'Zoella followed Christy',
    'Welcome, JacksGap',
    'JacksGap followed JennaMarbles',
    'Welcome, PewDiePie',
    'Welcome, Zoella',
    'Statistics'
    ]
));

console.log(processUsers(
    [
    'Welcome, EmilConrad',
    'Welcome, VenomTheDoctor',
    'Welcome, Saffrona',
    'Saffrona followed EmilConrad',
    'Saffrona followed VenomTheDoctor',
    'EmilConrad followed VenomTheDoctor',
    'VenomTheDoctor followed VenomTheDoctor',
    'Saffrona followed EmilConrad'
    ]
));

//problem 2 - Travellers Log
function travellersLog(input) {
    let travellers = {};
    let result = [];
    let exec1;
    let exec2;
    for (let lineInput of input) {
        let line = lineInput.trim();
        exec1 = /([A-Za-z]+)\s+gets\s+(\d+)/g.exec(line)
        exec2 = /([A-Za-z]+)\s+visited\s+the\s+([A-Za-z]+)\s+in\s+([A-Za-z]+)\s+-\s+(\d+)/g.exec(line)
        
        if(exec1) {
            let traveller = exec1[1];
            let cash = +exec1[2];
            if(!travellers.hasOwnProperty(traveller)) {
                travellers[traveller] = {};
                travellers[traveller].cash = 0;
            }
            travellers[traveller].cash += cash;
        }
        if (exec2) {
            let traveller = exec2[1];
            let landmark = exec2[2];
            let country = exec2[3];
            let cost = +exec2[4];

            if(!travellers.hasOwnProperty(traveller)) {
                travellers[traveller] = {};
                travellers[traveller].cash = 0;
            }

            if (travellers.hasOwnProperty(traveller) && travellers[traveller].cash >= cost){
                if(!travellers[traveller].hasOwnProperty(country)) {
                    travellers[traveller][country] = [];
                }
                if(!travellers[traveller][country].includes(landmark)) {
                    travellers[traveller][country].push(landmark);
                    travellers[traveller].cash -= cost;
                }
            } else if (travellers[traveller].cash < cost) {
                if(travellers[traveller].hasOwnProperty(country)) {
                    if(travellers[traveller][country].includes(landmark)) {
                        continue;
                    }
                }
                result.push(`Not enough money to visit ${landmark}`)
            }
        }
    }

    let sortedTravellers = Object.keys(travellers)
        .sort((t1, t2) => 
            Object.keys(travellers[t2]).filter(p => p !== 'cash').length - Object.keys(travellers[t1]).filter(p => p !== 'cash').length);
        
    for (const key of sortedTravellers) {
        result.push(`${key} visited ${Object.keys(travellers[key]).length - 1} countries and has ${travellers[key].cash} money left`);
        
        let sortedCountries = Object.keys(travellers[key])
        .filter(p => p !== 'cash')
            .sort((c1, c2)  => Object.keys(travellers[key][c2]).length - Object.keys(travellers[key][c1]).length);
        
            for (const country of sortedCountries) {
            result.push(`- ${country} -> ${Object.keys(travellers[key][country]).length} landmarks`);
                
            travellers[key][country]
                .sort((a, b) => a.localeCompare(b))
                .forEach( l =>
                    result.push(`-- ${l}`)
                );
        }
    }
    return result.join('\n');
}

console.log(travellersLog(
    ['Peter gets 100', 
    'Peter visited the StatueOfLiberty in USA - 50', 
    'Bill gets 250', 
    'Tim visited the ChristTheRedeemer in Brazil - 150', 
    'Bill gets 400', 
    'Bill visited the MountFuji in Japan - 600', 
    'Bill visited the TeatroAmazonas in Brazil - 50',
    'Bill gets 150', 
    'Bill visited the ChristTheRedeemer in Brazil - 150', 
    'Tim gets 500', 
    'Bill visited the StatueOfLiberty in USA - 440', 
    'Tim visited the StatueOfLiberty in USA - 440',
    'Tim visited the StatueOfLiberty in USA - 440',
    'Maria gets 650', 
    'Maria visited the StatueOfLiberty in USA - 440', 
    'Maria visited the CapeCod in USA - 100']
));

console.log(travellersLog(
    ['Peter gets 100', 
    'Peter visited the StatueOfLiberty in USA - 50', 
    'Bill gets 250',
    'Bill gets 400', 
    'Peter gets 150', 
    'Peter visited the ChristTheRedeemer in Brazil - 150']
));

//problem 3 - School Grades
function arrangeStudents(input) {
    let students = {};
    for (let line of input) {
        let [t1, name, t2, grade, t3, avgScore] = line.split(/: |, /).filter(t => t !== '');
        grade = (+grade + 1).toString();

        if(+avgScore >= 3){
            if(!students.hasOwnProperty(grade)) {
                students[grade] = [];
                students[grade].avgGrade = 0;
            }
            if (!students[grade].includes(name)) {
                students[grade].push(name);
                students[grade].avgGrade += +avgScore
            }
        }
    }

    let result = [];
    let sortedGrades = Object.keys(students).sort((a,b) => +a - +b);
    for (const key of sortedGrades) {
        result.push(key + ' Grade ');
        result.push(`List of students: ${students[key].join(', ')}`);
        let avgToPrint = students[key].avgGrade / students[key].length;
        result.push(`Average annual grade from last year: ${avgToPrint.toFixed(2)}`);
        result.push('');
    }

    return result.join('\n');

}


console.log(arrangeStudents(
    ['Student name: Mark, Grade: 8, Graduated with an average score: 4.75',
    'Student name: Ethan, Grade: 9, Graduated with an average score: 5.66',
    'Student name: George, Grade: 8, Graduated with an average score: 2.83',
    'Student name: Steven, Grade: 10, Graduated with an average score: 4.20',
    'Student name: Joey, Grade: 9, Graduated with an average score: 4.90',
    'Student name: Angus, Grade: 11, Graduated with an average score: 2.90',
    'Student name: Bob, Grade: 11, Graduated with an average score: 5.15',
    'Student name: Daryl, Grade: 8, Graduated with an average score: 5.95',
    'Student name: Bill, Grade: 9, Graduated with an average score: 6.00',
    'Student name: Philip, Grade: 10, Graduated with an average score: 5.05',
    'Student name: Peter, Grade: 11, Graduated with an average score: 4.88',
    'Student name: Gavin, Grade: 10, Graduated with an average score: 4.00']
));

//problem 4 - Browser Logger
function browserLogger(obj, commands) {
    let browser = JSON.parse(JSON.stringify(obj));
    let browserName = 'Browser Name';
    let openTabs = "Open Tabs";
    let recentlyClosed = 'Recently Closed';
    let browserLogs = 'Browser Logs';

    for (let command of commands) {
        let tokens = command.split(' ').filter(t => t !== '');
        if (tokens[0] === "Open") {
            browser[openTabs].push(tokens[1].trim());
            browser[browserLogs].push(command);

        } else if (tokens[0] === "Close") {
            let tab = tokens[1].trim();
            if(browser[openTabs].includes(tab)) {
                browser[recentlyClosed].push(tab);
                let index = browser[openTabs].indexOf(tab);
                browser[openTabs].splice(index,1);
                browser[browserLogs].push(tokens[0] + ' ' + tokens[1]);
            }

        } else if(command === 'Clear History and Cache'){
            browser[openTabs] = [];
            browser[recentlyClosed] = [];
            browser[browserLogs] = [];
        }
    }

    let result = [];
    result.push(browser[browserName]);
    result.push('Open Tabs: ' + browser[openTabs].join(', '));
    result.push('Recently Closed: ' + browser[recentlyClosed].join(', '));
    result.push('Browser Logs: ' + browser[browserLogs].join(', '));
    return result.join('\n').trim();
}

console.log(browserLogger(
    {"Browser Name":"Google Chrome",
    "Open Tabs":["Facebook", 'Facebook', "YouTube","Google Translate"],
    "Recently Closed":["Yahoo","Gmail"],
    "Browser Logs":["Open YouTube","Open Yahoo","Open Google Translate","Close Yahoo","Open Gmail","Close Gmail","Open Facebook"]},
    ['Close Facebook', 'Open StackOverFlow', 'Open Google']
));

console.log(browserLogger(
    {"Browser Name":"Mozilla Firefox",
    "Open Tabs":["YouTube"],
    "Recently Closed":['Gmail', 'Dropbox'],
    "Browser Logs":['Open Gmail', 'Close Gmail', 'Open Dropbox', 'Open YouTube', 'Close Dropbox']},
    ['Open Wikipedia', 'Clear History and Cache', 'Open Twitter']
));

//problem 5 - Catalogue
function storeCatalogue(input) {
    let catalogue = new Map();

    for (let line of input) {
        let [product, price] = line.split(/\s*:\s*/).filter(t => t !== '');
        let groupName = product.toUpperCase()[0];

        if (!catalogue.has(groupName)) {
            catalogue.set(groupName, new Map);
        }
            
        catalogue.get(groupName).set(product.trim(),+price);
    }

    let keys = [...catalogue.keys()].sort((a, b) => a.localeCompare(b)); 
    let result =[];
    for (let key of keys) {
        result.push(key);
        let products = [...catalogue.get(key).keys()].sort((a, b) => a.localeCompare(b));
        for (let product of products) {
            result.push(`  ${product}: ${catalogue.get(key).get(product)}`);
        }
    }

    return result.join('\n');
}

console.log(storeCatalogue(
 ["Appricot : 20.4",
"Fridge : 1500",
"TV : 1499",
"Deodorant : 10",
"Boiler : 300",
"Apple : 1.25",
"Anti-Bug Spray : 15",
"T-Shirt : 10"]
));

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

//problem 6 - Flight Schedule
function checkFlight(input) {

    let allFlights= input[0];
    let changedStatuses= input[1];
    let statusToCheck= input[2][0];
    let flights = {};

    for (let flight of allFlights) {
        let tokens = flight.split(' ').filter(f => f !== '');
        if (!flight.hasOwnProperty(tokens[0])) {
            flights[tokens[0]] = {};
            flights[tokens[0]].destination = tokens.slice(1).join(' ');
            flights[tokens[0]].status = 'Ready to fly';
        }
    }

    for (let change of changedStatuses) {
        let [name, changedStatus] = change.split(' ').filter(f => f !== '');
        if (flights.hasOwnProperty(name)) {
            flights[name].status = changedStatus;
        }
    }

    let result = [];
    let sortedFlights = [...Object.keys(flights)].filter(f => flights[f].status === statusToCheck);
    for (let fl of sortedFlights) {
        result.push(`{ Destination: '${flights[fl].destination}', Status: '${flights[fl].status}' }`)
    }

    return result.join('\n');
}

console.log(checkFlight(
    [['WN269 Delaware',
   'FL2269 Oregon',
    'WN498 Las Vegas',
    'WN3145 Ohio',
    'WN612 Alabama',
    'WN4010 New York',
    'WN1173 California',
    'DL2120 Texas',
    'KL5744 Illinois',
    'WN678 Pennsylvania'],
    ['DL2120 Cancelled',
	'WN612 Cancelled',
	'WN1173 Cancelled',
	'SK430 Cancelled'],
	['Cancelled']
]
));
console.log(checkFlight(
    [['WN269 Delaware',
   'FL2269 Oregon',
    'WN498 Las Vegas',
    'WN3145 Ohio',
    'WN612 Alabama',
    'WN4010 New York',
    'WN1173 California',
    'DL2120 Texas',
    'KL5744 Illinois',
    'WN678 Pennsylvania'],
    ['DL2120 Cancelled',
	'WN612 Cancelled',
	'WN1173 Cancelled',
	'SK330 Cancelled'],
	['Ready to fly']
]
));