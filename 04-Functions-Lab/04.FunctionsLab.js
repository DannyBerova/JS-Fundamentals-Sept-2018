//problem 1 - Triangle of Stars
function triangleOfStars(n) {
    function printStars(countStars) {
        console.log('*'.repeat(countStars));
    }

    n = +n;
    for (let i = 1; i <= n; i++) {
       printStars(i);
    }   
    for (let i = n -1; i > 0; i--) {
       printStars(i);
    }  
}

triangleOfStars([1]);
triangleOfStars([2]);
triangleOfStars([5]);

//problem 2 - Square of Stars
function rectangleOfStars(n = 5) {
    n = +n;
    for (let i = 1; i <= n; i++) {
        printStars();
    }

    function printStars(countStars = n) {
        console.log('* '.repeat(countStars));
    }
}

rectangleOfStars();
rectangleOfStars(1);
rectangleOfStars(2);
rectangleOfStars(5);
rectangleOfStars(3, 5, 8);

//problem 3 - Palindrome
function isPalindrome(input) {
    let reversed = input.split('').reverse().join('');
    if(input === reversed) {
        return true;
    } else {
        return false;
    }
}

console.log(isPalindrome('haha'));
console.log(isPalindrome('racecar'));
console.log(isPalindrome('unitinu'));

//problem 4 - Day of Week
function dayOfWeek(input) {
    switch (input) {
        case 'Monday': return 1;
        case 'Tuesday': return 2;
        case 'Wednesday': return 3;
        case 'Thursday': return 4;
        case 'Friday': return 5;
        case 'Saturday': return 6;
        case 'Sunday': return 7;
        default: return "error";
    }
}

console.log(dayOfWeek('Monday'));
console.log(dayOfWeek('Friday'));
console.log(dayOfWeek('Frabjoyousday'));

//problem 5 - Functional Calculator
function functionalCalculator(a, b, operator) {
    let calc = function(a, b, action) {return action(a, b)};
    
    let add = function (a, b) {return a + b};
    let subtract = function (a, b) {return a - b};
    let multiply = function (a, b) {return a * b};
    let divide = function (a, b) {return a / b};

    switch (operator) {
        case '+': return calc(a, b, add);
        case '-': return calc(a, b, subtract);
        case '*': return calc(a, b, multiply);
        case '/': return calc(a, b, divide);
    }
}

console.log(functionalCalculator(2, 4, '+'));
console.log(functionalCalculator(3, 3, '/'));
console.log(functionalCalculator(18, -1, '*'));

//problem 6 - Aggregate Elements
function aggregateElements(input) {
    function aggregate(arr, initialValue, func) {
        let result = initialValue;
        for (let element of arr) {
            result = func(result, element);
        }
        console.log(result);
    }
    
    let elements = input.map(Number);
    let sum = (a, b) => a + b;

    aggregate(elements, 0, sum); 
    aggregate(elements, 0, (a, b) => a + 1/b); 
    aggregate(elements, '', sum); 
}

aggregateElements(['1', '2', '3']);
aggregateElements(['2', '4', '8', '16']);
aggregateElements([10, 20, 30]);

//problem 7 - Words Uppercase
function wordsUppercase(input) {
    let arr = input.toUpperCase()
                   .split(/\W+/)
                   .filter(w => w != '');
    
    return arr.join(', ');
}

console.log(wordsUppercase('Hi, how are    you?'));
console.log(wordsUppercase('hello'));