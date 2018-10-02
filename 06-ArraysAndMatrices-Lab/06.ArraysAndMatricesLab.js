//problem 1 - Sum First Last
function sumFirstLast(arr) {
    return +arr[0] + +arr[arr.length-1];
}

console.log(sumFirstLast(['20', '30', '40']));
console.log(sumFirstLast(['5', '10']));

//problem 2 - Even Position Element
function evenPositionElements(arr) {
    let result = [];

    for (let i in arr) {
        if (i % 2 == 0) {
            result.push(arr[i]);
        }
    }
    return result.join(' ');
}

console.log(evenPositionElements(['20', '30', '40']));
console.log(evenPositionElements(['5', '10']));

//problem 3 - Negative/Positive Numbers
function negativePositiveNums(arr) {
    
    let result = [];

    arr.map( (i) => {
        if (+i < 0) {
            result.unshift(i);
        } else {
            result.push(i);
        }    
    });
    
    return result.join('\n');
}

console.log(negativePositiveNums([7, -2, 8, 9]));
console.log(negativePositiveNums([3, -2, 0, -1]));

//problem 4 - First and Last K Numbers
function firstLastKElements(arr) {
    let k = +arr.shift();
    console.log(arr.slice(0, k).join(' '));
    console.log(arr.slice(-k,).join(' '));   
}

firstLastKElements(['2', '7', '8', '9']);
firstLastKElements(['3', '6', '7', '8', '9']);

//problem 5 - Last K Numbers Sequence
function lastKNumbersSeq(n, k) {
    n = +n;
    k = +k;
    let seq = [1];

    for (let i = 1; i < n; i++) {
        let start = Math.max(0, i - k);
        let end = i - 1;
        let sum = 0;

        for (let j = start; j <= end; j++) {
             sum += seq[j];
        }
           
        seq[i] = sum;
    }
    return seq.join(' ');
}

console.log(lastKNumbersSeq('6', '3'));
console.log(lastKNumbersSeq('8', '2'));

//problem 6 - Process Odd Nyumbers
function processOddPositionNums(arr) {
    let result = arr
        .filter((x, i) => i % 2 != 0)
        .map(x => 2 * x)
        .reverse();

    return result.join(' ');
}

console.log(processOddPositionNums(['10', '15', '20', '25']));
console.log(processOddPositionNums(['3', '0', '10', '4', '7', '3']));

//problem 7 - Smallest Two Numbers
function smallestTwoNumbers(arr) {
    let result = arr
        .sort((a, b) => a - b)
        .slice(0, 2)
        .join(' ');

    return result;
}

console.log(smallestTwoNumbers(['30', '15', '50', '5']));
console.log(smallestTwoNumbers(['3', '0', '10', '4', '7', '3']));

//problem 8 - Biggest Element
function biggestElement(matrix) {
   
    let maxElement = Number.NEGATIVE_INFINITY;
    
    matrix
    .forEach(r => r.forEach(x => maxElement = Math.max(maxElement, x)));
    return maxElement;
}

console.log(biggestElement([[20, 50, 10], [8, 33, 145]]));
console.log(biggestElement([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]]));

//problem 9 - Diagonal Sum
//credits to Kristyan Sevov :)
function calcTwoDiagonals(input) {

    let diagonals =  input.reduce((acc, cur, index) => {

        acc[0] += +input[index][index];
        acc[1] += +input[index][input.length - 1 - index];
        return acc;

    }, [0, 0]);

    return diagonals.join(' ');
}

console.log(calcTwoDiagonals([[20, 40], [10, 60]]));
console.log(calcTwoDiagonals([[3, 5, 17], [-1, 7, 14], [1, -8, 89]]));

//problem 10 - Equal Neighbors
function equalNeighbors(matrix) {
    let count = 0;
    for (let row = 0; row < matrix.length; row++)
        for (let col = 0; col < matrix[0].length; col++) {
            if (col < matrix[0].length - 1 && matrix[row][col] == matrix[row][col + 1]) count++;
            if (row < matrix.length - 1 && matrix[row][col] == matrix[row + 1][col])    count++;
        }
    return count;
}


console.log(equalNeighbors([
    ['2', '3', '4', '7', '0'],
    ['4', '0', '5', '3', '4'],
    ['2', '3', '5', '4', '2'],
    ['9', '8', '7', '5', '4']]
    ));
 console.log(equalNeighbors([
    ['test', 'yes', 'yo', 'ho'],
    ['well', 'done', 'yo', '6'],
    ['not', 'done', 'yet', '5']]
    ));
    


