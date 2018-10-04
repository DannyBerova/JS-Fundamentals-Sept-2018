//problem 1 - Split a String with a Delimiter
function splitWithDelimeter(text, delimeter) {
    let result = text.split(delimeter).join('\n');
    return result;
}

console.log(splitWithDelimeter('One-Two-Three-Four-Five', '-'));
console.log(splitWithDelimeter('http://platform.softuni.bg', '.'));

//problem 2 - Repeat a String N Times
function repeatString(text, n) {
    let result = text.repeat(n);
    return result;
}

console.log(repeatString('repeat', 5));
console.log(repeatString('magic is real', '3'));

//problem 3 - Check If String Starts With a Given Substring
function checkStrStart(text, pattern) {
    return text.startsWith(pattern);
}

console.log(checkStrStart('How have you been?', 'how'));
console.log(checkStrStart('Marketing Fundamentals, starting 19/10/2016', 'Marketing Fundamentals, sta'));

//problem 4 - Check If String Ends With Given Substring
function checkStrEnds(text, pattern) {
    return text.endsWith(pattern);
}

console.log(checkStrEnds('This sentence ends with fun?', 'fun?'));
console.log(checkStrEnds('This is Houston, we have…', 'We have…'));

//problem 5 - *Capitalize the Words
function capitalizeWords(input) {
    let result = input
                .split(' ')
                .map(w =>  w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    return result.join(' ');
}

console.log(capitalizeWords('Capitalize these words'));

//problem 6 - Capture the Numbers
function cathAllNumbers(input) {
let result = [];
let reg = /\d+/g;
result = input.join('').match(reg);
return result.join(' ');
}

console.log(cathAllNumbers(['The300', 
'What is that?', 
'I think it’s the 3rd movie.', 
'Lets watch it at 22:45']
));
console.log(cathAllNumbers(['123a456', 
'789b987', 
'654c321', 
'0']
));

//problem 7 - Find Variable Names in Sentence
function findVariableNames(input) {
    let result = [];
    let reg = /_([A-Za-z0-9]+)/g;
    let exec;
    while(exec = reg.exec(input)) {
        result.push(exec[1]);
    }

    return result.join(',');
}

console.log(findVariableNames('The _id and _age variables are both integers.'));
console.log(findVariableNames('Calculate the _area of the _perfectRectangle object.'));
console.log(findVariableNames('__invalidVariable _evenMoreInvalidVariable_ _validVariable'));

//problem 8 - Find Occurences of Word in Sentence
function findOccurr(text, str) {
    let word = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    let reg = new RegExp('\\b' + word + '\\b', 'ig');
    let count = 0;
    let match;
    while(match = reg.exec(text)) {
        count++;
    }
    return count;
}

console.log(findOccurr('The waterfall was so high, that the child couldn’t see its peak.','the'));
console.log(findOccurr('How do you plan on achieving that? How? How can you even think of that?', 'how'));
console.log(findOccurr('There was one. Therefore I bought it. I wouldn’t buy it otherwise.', 'there'));

//problem 9 - *Extract the Links
function extractLinks(input) {
    let reg = /www\.([A-Za-z0-9-]+)(\.[a-z]+)+/g;
    let result = [];
    let match;
    for (let line of input) {
        while(match = reg.exec(line)) {
            result.push(match[0]);
        }
    }

    return result.join('\n');
}

//vers 2
// function extractLinks(input) {
//     let reg = /www\.([A-Za-z0-9-]+)(\.[a-z]+)+/g;
//     let result = [];
//     for (let line of input) {
//         if(line.match(reg)) {
//             result = result.concat(line.match(reg));
//         }     
//     }    
//     return result.join('\n');
//  }

console.log(extractLinks(['Join WebStars now for free, at www.web-stars.com', 
'You can also support our partners:', 
'Internet - www.internet.com', 
'WebSpiders - www.webspiders101.com', 
'Sentinel - www.sentinel.-ko'] 
));

//problem 10 - **Secret Data
function secretData (arr) {
    function maskText(match) {
        return '|'.repeat(match.length);
    }

    for (let line of arr) {
        let clientPattern = /(\*[A-Z][a-zA-Z]*)(?=[ \t]|$)|(\+[\d-]{10})(?=[ \t]|$)|(![a-zA-Z\d]+)(?=[ \t]|$)|(_[a-zA-Z\d]+)(?=[ \t]|$)/g;
        line = line.replace(clientPattern, maskText);
        console.log(line);
    }  
}

secretData([
    'Agent *Ivankov was in the room when it all happened.',
    'The person in the room was heavily armed.',
    'Agent *Ivankov had to act quick in order.',
    'He picked up his phone and called some unknown number.',
    'I think it was +555-49-796',
    "I can't really remember...",
    'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    "I really don't know what happened there.",
    'This is all I saw, that night.',
    'I cannot explain it myself...'
]);

