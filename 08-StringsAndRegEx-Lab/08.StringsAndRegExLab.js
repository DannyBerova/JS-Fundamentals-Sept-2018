//problem 1 - Print Letters
function printLetters(str) {
    let result = '';
    for(let i in str) {
        result +=`str[${i}] -> ${str[i]}\n`;
    }
    return result.trim();
}

console.log(printLetters('Hello, World!'));
console.log(printLetters('SoftUni'));

//problem 2 - Concatenate Reversed
function concatenateReverse(arr) {
    let result = Array.from(arr.join(''))
                    .reverse()
                    .join('');
    return result;
}

console.log(concatenateReverse(['I', 'am', 'student']));
console.log(concatenateReverse(['race', 'car']));

//problem 3 - Count Occurrences
function countOccurences(str, text) {
    let count = 0;
    let index = text.indexOf(str);
    while(index > -1) {
        count++;
        index = text.indexOf(str, index + 1);
    }
    console.log(count);
}

countOccurences('the', 'The quick brown fox jumps over the lay dog.');
countOccurences('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.');

//problem 4 - Extract Text
function extractText(text){
    let result = [];
    let startIndex = text.indexOf('(');
    let endIndex = text.indexOf(')', startIndex);
    while(startIndex>-1 && endIndex>-1){
        let temp = text.substring(startIndex+1, endIndex);
        result.push(temp);
        startIndex = text.indexOf('(',endIndex+1);
        endIndex = text.indexOf(')',startIndex+1);
    }
   
    console.log(result.join(', '));
}

extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)');

//problem 5 - Aggregate Table
function aggregateTable(input) {
    let towns = [];
    let incomeSum = 0;
    for (let line of input) {
        let data = line.split('|'); 
        towns.push(data[1].trim());	
        incomeSum += +data[2].trim(); 
    }
    console.log(towns.join(', '));
    console.log(incomeSum);
}

aggregateTable(['| Sofia           | 300',
                '| Veliko Tarnovo  | 500',
                '| Yambol          | 275']);

//problem 6 - Restaurant Bill
function restaurantBill(input) {
    let products = input.filter((x, i) => i % 2 === 0);
    let sum = input.filter((x, i) => i % 2 !== 0)
                    .map(Number)
                    .reduce((a, b) => a + b);
    return `You purchased ${products.join(', ')} for a total sum of ${sum}`;
}

console.log(restaurantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']));
console.log(restaurantBill(['Cola', '1.35', 'Pancakes', '2.88']));

//problem 7 - Usernames
function usernames(input) {
    let usernames = [];
    for (let email of input) {
        let [user, domain] = email.split('@');
        let domainTokens = domain.split('.');
        let username = user + '.';
        domainTokens.forEach(t => username += t[0]);
        usernames.push(username);
    }
    return usernames.join(', ');
}

console.log(usernames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']));

//problem 8 - Censorship
function censorship(text, patterns) {
    for (let pattern of patterns) {
        let replacementText = '-'.repeat(pattern.length);
        while(text.indexOf(pattern) > -1)
            text = text.replace(pattern, replacementText);
    }
    return text;
}

console.log(censorship('roses are red, violets are blue',
                        [', violets are', 'red']));
console.log(censorship('David Ruben Piqtoukun (born 1950) is an Inuit artist from Paulatuk, Northwest Territories. His output includes sculpture and prints; the sculptural work is innovative in its use of mixed media. His materials and imagery bring together modern and traditional Inuit stylistic elements in a personal vision. An example of this is his work "The Passage of Time" (1999), which portrays a shaman in the form of a salmon moving through a hole in a hand. While shamanic imagery is common in much of Inuit art, the hand in this work is sheet metal, not a traditional material such as walrus ivory, caribou antler or soapstone. Ruben\'s brother, Abraham Apakark Anghik Ruben, is also a sculptor. Fellow Inuit artist Floyd Kuptana learned sculpting techniques as an apprentice to David Ruben.',
['Inuit']));

//problem 9 - Escaping
//removed from current lab
function htmlEscaping(items) {
    let result =  '<ul>\n'
        + items.map(htmlEscape)
                .map(item => `\t<li>${item}</li>`)
                .join('\n')
        + '\n</ul>\n';

    function htmlEscape(input) {
        return input.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
    }

    return result;
}

console.log(htmlEscaping(['<b>unescaped text</b>', 'normal text']));
console.log(htmlEscaping(['<div style=\"color: red;\">Hello, Red!</div>', '<table><tr><td>Cell 1</td><td>Cell 2</td><tr>']));

//problem 10 - Match All Words
function matchAllWords(text) {
    let words = text.match(/\w+/g);
    return words.join('|');
}

console.log(matchAllWords('A Regular Expression needs to have the global flag in order to match all occurrences in the text'));
console.log(matchAllWords('_(Underscores) are also word characters'));

//problem 11 - Simple Email Validation
function emailValidation(email) {
    let validation = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;
    let result = validation.test(email) ? "Valid" : "Invalid";
    return result;
}

console.log(emailValidation('valid@email.bg'));
console.log(emailValidation('invalid@emai1.bg'));

//problem 12 - *Expression Split
function expressionSplit(input) {
    return input.split(/[\s.,;()]+/g)
                .join('\n');
}

console.log(expressionSplit('let sum = 4 * 4,b = "wow";'));
console.log(expressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}'));

//problem 13 - Match the Dates
function matchDates(input) {
    let dates = [];
    let match;
    let datePattern = /\b(\d{1,2})-([A-Z][a-z]{2})-(\d{4})\b/g;
    for (let line of input) {
        while (match = datePattern.exec(line))
            dates.push(`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`);
    }
    return dates.join('\n');
}

console.log(matchDates(['I am born on 30-Dec-1994.',
            'My father is born on the 29-Jul-1955.']));
console.log(matchDates(['01-Jan-1999 is a valid date.',
            'So is 01-July-2000.',
'I am an awful liar, by the way – Ivo, 28-Sep-2016.']));

//problem 14 - Parse the Employee Data
function parseData(input) {
    let pattern = /^([A-Z][a-zA-Z]*) - ([1-9]\d*) - ([a-zA-Z\d -]+)$/;
    let reg = RegExp(pattern);
    let match;
    let employees = [];

    input.forEach(element => {
        match = reg.exec(element);
        if(match) {
            let employee = {
                name: match[1],
                salary: match[2],
                position: match[3]
            };

            employees.push(employee);
        }
    });

    employees.forEach(employee => {
        let output = `Name: ${employee.name}\nPosition: ${employee.position}\nSalary: ${employee.salary}`;
        console.log(output);
    });
}
parseData(['Isacc - 1000 - CEO',
        'Ivan - 500 - Employee',
        'Peter - 500 – Employee']);
parseData(['Jonathan - 2000 - Manager',
        'Peter- 1000- Chuck',
        'George - 1000 - Team Leader ']);

//problem 15 - Form Filler
// function formFilter(username, email, phoneNumber, formData) {
//     let regexUsername = /<![a-zA-Z]+!>/g;
//     let regexEmail = /<@[a-zA-Z]+@>/g;
//     let regexPhoneNumber = /<\+[a-zA-Z]+\+>/g;

//     let output = formData.map(line => {
//         line = line.replace(regexUsername, username);
//         line = line.replace(regexEmail, email);
//         line = line.replace(regexPhoneNumber, phoneNumber);
//         return line;
//     });
//     return output.join('\n');
// }
function formFilter(username, email, phoneNumber, formData) {
        let regexUsername = /<![a-zA-Z]+!>/g;
        let regexEmail = /<@[a-zA-Z]+@>/g;
        let regexPhoneNumber = /<\+[a-zA-Z]+\+>/g;
    
        let output = formData.forEach(line => {
            line = line.replace(regexUsername, username);
            line = line.replace(regexEmail, email);
            line = line.replace(regexPhoneNumber, phoneNumber);
            console.log(line);
        });
    }

console.log(formFilter('Pesho',
            'pesho@softuni.bg',
            '90-60-90',
            ['Hello, <!username!>!',
            'Welcome to your Personal profile.',
            'Here you can modify your profile freely.',
            'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
            'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
            'Your current phone number is: <+number+>. Would you like to change that? (Y/N)']));

//problem 16 - Match Multiplication
function matchMultiplication(input) {
    let reg = /(-?\d+)\s*\*\s*(-?[\d]+\.?\d*)/;
    //let match;
    // while (match = reg.exec(input))
    //     input = input.replace(reg, +match[1] * +match[2]);
        
    input = input.replace(reg, (all, g1, g2) => +g1 * +g2)
    console.log(input);
}

matchMultiplication('My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).');

