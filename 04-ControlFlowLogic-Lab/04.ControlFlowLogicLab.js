//problem 1 - Multiply Numbers
function multiplyNumbers(a, b){
return +a * +b;
}

console.log(multiplyNumbers(3, 2));
console.log(multiplyNumbers(23632.36, -12.3249));

//problem 2 - Boxes and Bottles
function calcBoxes(bottles, boxCapacity){
    let boxesCount = Math.ceil(bottles / boxCapacity);
    return boxesCount;
    }
    
    console.log(calcBoxes(20, 5));
    console.log(calcBoxes(15, 7));
    console.log(calcBoxes(5, 10));

//problem 3 - Leap Year
function isLeapYear(year){
    year = +year;
    let isLeapYear = (year % 400 == 0 ) || (year % 4 == 0 && year % 100 != 0);
    console.log(isLeapYear ? "yes" : "no"); 
}

    isLeapYear('1999');
    isLeapYear('2000');
    isLeapYear('1900');

    //problem 4 - Circle Area
    function calcAreaByRadius(radius){
        let area = Math.PI * radius ** 2;
        console.log(area);
        console.log(area.toFixed(2));
    }

    calcAreaByRadius('5');

    //problem 5 - Triangle Area
    function calcArea(a, b, c){
        let s = (a + b + c)/2;
        let area = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        console.log(area);
    }

    calcArea(2, 3.5, 4);

    //problem 6 - Cone
    function calcConeAreaAndVolume(radius, height){
        let volume = Math.PI * (radius ** 2) * (height / 3);
        let surfaceArea = Math.PI * radius * (radius + Math.sqrt((height ** 2) + (radius ** 2)));

        console.log(`volume = ${volume.toFixed(4)}`);
        console.log(`area = ${surfaceArea.toFixed(4)}`);
    }

    calcConeAreaAndVolume(3, 5);

    //problem 7 - Odd / Even
    function checkOddEven(num){
        if(!Number.isInteger(num)){
            console.log("invalid")
        }
        else{
            let isEven = num % 2 === 0;
            console.log(isEven ? 'even' : 'odd');
        }
    }

    checkOddEven(5);
    checkOddEven(8);
    checkOddEven(1.5);

    //problem 8 - Fruit or Vegetable
    function printFruitOrVeggie(word) {
        switch (word) {
            case 'banana':
            case 'apple':
            case 'kiwi':
            case 'cherry':
            case 'lemon':
            case 'grapes':
            case 'peach':
                console.log('fruit'); break;
            case 'tomato':
            case 'cucumber':
            case 'pepper':
            case 'onion':
            case 'parsley':
            case 'garlic':
                console.log('vegetable'); break;
            default:
                console.log('unknown');
        }
    }
    
    printFruitOrVeggie('banana');
    printFruitOrVeggie('cucumber');
    printFruitOrVeggie('pizza');

    //problem 9 - Colorful Numbers
    function printColorfulNums(n){
        let result = '<ul>\n';
        for (let i = 1; i <= n; i++) {
            if(i % 2 === 0){
                result += `'<li><span style="color:blue">${i}</span></li>\n'`
            }
            else{
                result += `'<li><span style="color:green">${i}</span></li>\n'`
            }
        }
        result += '</ul>';
        return result;
    }

    console.log(printColorfulNums(10));

    //problem 10 - Chessboard
    function printChessboard(n){
        let result = '<div class="chessboard">\n';
        let counter = 1;
        for (let i = 1; i <= n; i++) {
            result += '  <div>\n';
            if(n % 2 === 0){
                counter++;
            }
            else if(n % 2 !== 0 && i === 1){
                counter++;
            }
            for (let j = 1; j <= n; j++) {
                counter++;
                if(counter % 2 === 0){
                    result += '    <span class="white"></span>\n';
                } 
                else{
                    result += '    <span class="black"></span>\n';
                }         
            } 
            result += '  </div>\n';         
        }

        result += '</div>';
        return result;
    }

    console.log(printChessboard(3));
    console.log(printChessboard(4));
    console.log(printChessboard(2));

    //problem 11 - Binary Logarithm
    function printBinary(numbers){
        numbers = numbers.map(Number);
        for (let num of numbers){
            console.log(Math.log2(num));
        }
    }
    
    printBinary(['1024']);

    //problem 12 - Prime Number Checker
    function primeNumberChecker(number) {
        number = +number;
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                isPrime = false;
                break;
            }
        }
        return isPrime && (number > 1);
    }
    
    console.log(primeNumberChecker(7));
    console.log(primeNumberChecker(8));
    console.log(primeNumberChecker(81));
    