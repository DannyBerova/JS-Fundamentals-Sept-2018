//problem 1 - Print an Array with a given Delimeter
function printArray(arr) {
    let delimiter = arr.pop();
    return arr.join(delimiter);
}

console.log(printArray(['One','Two','Three','Four','Five ','-']));
console.log(printArray(['How about no?', 'I', 'will', 'not', 'do', 'it!', '_']));

//problem 2 - Print every N-th Element from an Array
function printEveryNthElement(arr) {
    let n = +arr.pop();
    let result = arr.filter((x, i) => i % n === 0);

    return result.join('\n');
}

console.log(printEveryNthElement([5, 20, 31, 4, 20, 2]));
console.log(printEveryNthElement(['dsa', 'asd', 'test', 'tset', '2']));
console.log(printEveryNthElement([1,2,3,4,5,6]));

//problem 3 - *Add and Remove Elements from an Array
function addOrRemove(commands) {
    let count = 1;
    let arr = [];
    for (let command of commands) {
        if (command == 'add') {
            arr.push(count);
        } else if(command == 'remove') {
            arr.pop();
        }   
        count++;
    }

    console.log(arr.length > 0 ? arr.join('\n') : 'Empty');
}

addOrRemove(['add','add','add','add']);
addOrRemove(['add', 'add', 'remove', 'add', 'add']);
addOrRemove(['remove','remove','remove']);

//problem 4 - Rotate Array
function rotateArray(input) {
    let arr = input.slice(0);
    let spins = arr.pop() % arr.length;
    for (let i = 0; i < spins; i++){
        arr.unshift(arr.pop());
    }
        
    return arr.join(' ');
}

console.log(rotateArray(['1', '2', '3', '4', '2']));
console.log(rotateArray(['Banana','Orange','Coconut','Apple','15']));

//problem 5 - Extract a Non-decreasing Subsequence from an Array
function extractNonDecrSeq(input) {
    let arr = input.map(Number);
    let seq = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if(arr[i] >= seq[seq.length - 1]) {
            seq.push(arr[i]);
        }
    }
        
    return seq.join('\n');
}

console.log(extractNonDecrSeq([1, 3, 8, 4, 10, 12, 3, 2, 24]));
console.log(extractNonDecrSeq([1,2,3,4]));
console.log(extractNonDecrSeq([20,3,2,15,6,1]));

//problem 6 - Sort an Array by 2 Criteria
function sortArray(arr) {
    arr.sort(function (a, b) {
        if (a.length != b.length) {
            return a.length - b.length;
        }
        if (a.length == b.length) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        }
    });
    console.log(arr.join('\n'));
}


sortArray(['alpha', 'beta', 'gamma']);
sortArray(['Isacc','Theodor','Jack','Harrison','George']);
sortArray(['test','Deny','omen','Default']);

//problem 7 - Magic Matrices
function magicMatrices(arr) {
    let matrix = arr.slice(0);
    let sum = matrix[0].reduce((acc, cur) => acc + cur);

    for (let row = 0; row < matrix.length; row++) {
        let rowSum = matrix[row].reduce((acc, cur) => acc + cur);
        let colSum = 0;
        if (rowSum != sum) {
            return false;
        }

        for (let col = 0; col < matrix.length; col++) {
            colSum += matrix[row][col];
        }
            
        if (colSum != sum) {
            return false;
        }		
    }
    return true;
}

console.log(magicMatrices([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
]));
console.log(magicMatrices([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]
]));
console.log(magicMatrices([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]
]));

//problem 8 - *Spiral Matrix
function spiralMatrix(rows, cols) {
    printMatrix(getMatrix(rows, cols));

    function getMatrix(rows, cols) {
        let [count, maxCount, minRow, minCol, maxRow, maxCol] = [0, rows * cols, 0, 0, rows-1, cols-1];
        let matrix = [];
        for (let r = 0; r < rows; r++) matrix[r] = [];
        while (count < maxCount) {
            for (let c = minCol; c <= maxCol && count < maxCount; c++)	matrix[minRow][c] = ++count;
            minRow++;
            for (let r = minRow; r <= maxRow && count < maxCount; r++)	matrix[r][maxCol] = ++count;
            maxCol--;
            for (let c = maxCol; c >= minCol && count < maxCount; c--)	matrix[maxRow][c] = ++count;
            maxRow--;
            for (let r = maxRow; r >= minRow && count < maxCount; r--)	matrix[r][minCol] = ++count;
            minCol++;
        }
        return matrix;
    }

    function printMatrix(matrix) {
        matrix.forEach(row => console.log(row.join(' ')));
    }
}

spiralMatrix(5, 5);

spiralMatrix(3, 3);

//problem 9 - **DiagonalAttack
function diagonalAttack(arr) {
    let matrix = arr
                .map(row => row.split(' ')
                .filter(x => x != '')
                .map(Number));

    if (matrix.length != matrix[0].length) {
        return printMatrix(matrix); 
    }	// rows != cols -> not a square matrix 

    let diagonalsSum =  matrix.reduce((acc, cur, index) => {
        acc[0] += +matrix[index][index];
        acc[1] += +matrix[index][matrix.length - 1 - index];
        return acc;
    }, [0, 0]);
    
    if (diagonalsSum[0] === diagonalsSum[1]) {
        matrix.map((item, index) => {
            item.map((el, elIndex) => {
                    if(elIndex !== index && elIndex !== matrix.length - 1 - index) {
                        item[elIndex] = diagonalsSum[0];
                    }
                })
            });
        }
    printMatrix(matrix);

    function printMatrix(matrix) {
        matrix.forEach(row => console.log(row.join(' ')));
    }
}

diagonalAttack([
    '5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']);

diagonalAttack([
    '1 1 1',
    '1 1 1',
    '1 1 0']);

//problem 10 - *Orbit
function orbit(arr) {
    printMatrix(getMatrix(arr));

    function getMatrix(arr) {
        let [rows, cols, startRow, startCol] = arr.map(Number);
        let matrix = [];
        for (let row = 0; row < rows; row++) {
            matrix[row] = [];
            for (let col = 0; col < cols; col++) {
                matrix[row][col] = 1 + 
                Math.max(Math.abs(startRow - row),
                         Math.abs(startCol - col));
            }
        }
        return matrix;
    }

    function printMatrix(matrix) {
        matrix.forEach(row => console.log(row.join(' ')));
    }
}

orbit([4, 4, 0, 0]);
orbit([5, 5, 2, 2]);
orbit([3, 3, 2, 2]);
