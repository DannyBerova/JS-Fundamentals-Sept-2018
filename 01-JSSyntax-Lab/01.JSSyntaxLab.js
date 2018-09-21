//problem 1 - Sum 3 Numbers
function sum3Numbers(a, b, c){
    let sum = a + b + c;
    console.log(sum);
}

sum3Numbers(1, 2, 3)

//problem 2 - Sum And VAT
function sumAndVat(input){
    let sum = 0;
    for (let num of input) {
        sum += +num;
    }
    console.log(`sum = ${sum}`);
    console.log(`VAT = ${sum * 0.20}`);
    console.log(`total = ${sum * 1.20}`);
}

sumAndVat([1.20, 2.60, 3.50]);
sumAndVat([3.12, 5, 18, 19.24, 1953.2262, 0.001564, 1.1445]);

//problem 3 - Letter Occurrences in String
function letterCount(str, letter){
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            count++;
        }
    }
    console.log(count);
}

letterCount('hello', 'l');
letterCount('panther', 'n');

//problem 4 - Filter By Age
function filterByAge(minAge, name1, age1, name2, age2) {
    minAge = Number(minAge);
    let person1 = {name: name1, age: Number(age1)};
    let person2 = {name: name2, age: Number(age2)};
    if (person1.age >= minAge) console.log(person1);
    if (person2.age >= minAge) console.log(person2);
}

filterByAge('12', 'Ivan', '15', 'Asen', '9');

//problem 5 - String of Numbers 1…N
function nums1toN(num){
    let n = +num;
    let result = '';
    for (let i = 1; i <= n; i++) {
        result += i;   
    }
    console.log(result);
}

nums1toN('11');

//problem 6 - Figure Area
function calcFigureArea(w1, h1, w2, h2){
    let area = (h1 * w1) + (h2 * w2) - (Math.min(h1, h2) * Math.min(w1, w2))
    return area;
}

console.log(calcFigureArea(2, 4, 5, 3));
console.log(calcFigureArea(13, 2, 5, 8));

//problem 7 - Next Day
function calcNextDay(year, month, day){
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

calcNextDay(2016, 9, 30);

//problem 8 - Distance between Points
function calcDistance(x1, y1, x2, y2){
    let deltaXsqr = Math.pow(x1 - x2, 2);
    let deltaYsqr = Math.pow(y1 - y2, 2);
return Math.sqrt(deltaXsqr + deltaYsqr);
}

console.log(calcDistance(2, 4, 5, 0));
console.log(calcDistance(2.34, 15.66, -13.55, -2.9985));