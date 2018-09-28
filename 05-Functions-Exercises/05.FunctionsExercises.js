//problem 1 - Inside Volume
function isInside(input) {
    input = input.map(Number);   
    for (let i = 0; i < input.length - 2; i += 3) {
        let [x, y, z] = [input[i], input[i+1], input[i+2]];
        console.log(checkPoint(x, y, z) ? "inside" : "outside");
    }

    function checkPoint(x, y, z) {
        let [xMin, xMax, yMin, yMax, zMin, zMax] = [10, 50, 20, 80, 15, 50];
        if(x >= xMin && x <= xMax) {
            if(y >= yMin && y <= yMax) {
                if(z >= zMin && z <= zMax) {
                    return true;
                }
            }
        }
        return false;
    }
}

isInside([8, 20, 22]);
isInside([13.1, 50, 31.5, 50, 80, 50, -5, 18, 43]);

//problem 2 - Road Radar
function roadRadar(input) {
    let speed = +input[0];
    let area = input[1];
    
    function getLimit(area) {
        switch (area) {
            case 'motorway': return 130;
            case 'interstate': return 90;
            case 'city': return 50;
            case 'residential': return 20;
        }
    }

    function getInfraction(speed, limit) {
        let overSpeed = speed - limit;

        if(overSpeed <= 0) {
            return false;
        }
        else {
            if(overSpeed > 40) {
                return 'reckless driving'
            }
            else if (overSpeed > 20) {
                return 'excessive speeding'
            }
            else {
                return 'speeding'
            }
        }
    }

    let limit = getLimit(area);
    let infraction = getInfraction(speed, limit);
    if (infraction) {
        console.log(infraction);
    }
}

roadRadar([40, 'city']);
roadRadar([21, 'residential']);
roadRadar([120, 'interstate']);
roadRadar([200, 'motorway']);

//problem 3 - Template Format
function printTemplateFormat(input) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';

    for (let i = 0; i < input.length; i += 2) {
        xml += `\t<question>\n\t\t${input[i]}\n\t</question>\n`;
        xml += `\t<answer>\n\t\t${input[i+1]}\n\t</answer>\n`;
    }
    xml += '</quiz>';
console.log(xml);
}

printTemplateFormat(["Who was the forty-second president of the U.S.A.?",
    "William Jefferson Clinton"]);
printTemplateFormat(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]);

//problem 4 - Cooking By Numbers
function cookingByNumbers(input) {
    let result = +input[0];

    for (let i = 1; i < input.length; i++) {
        console.log(calcResult(input[i]));
    } 

    function calcResult(action) {
        switch (action) {
            case 'chop': return result /= 2;
            case 'dice': return result = Math.sqrt(result);
            case 'spice': return result += 1;
            case 'bake': return result *= 3;
            case 'fillet': return result *= 0.80;
        }
    }
}

cookingByNumbers(['32', 'chop', 'chop', 'chop', 'chop', 'chop']);
cookingByNumbers(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);

//problem 5 - Modify Average
function modifyAverage(input) {
    let number = '' + input;
    let sumDigits = 0;

    for (let i = 0; i < number.length; i++) {
        sumDigits += +number[i];
    }

    while ((sumDigits / number.length) <= 5) {
        number += 9;
        sumDigits += 9;
    }

console.log(number);
}

modifyAverage(101);
modifyAverage(5835);

//problem 6 - Validity Checker
function checkValidity(input) {
    let [x1, y1, x2, y2] = input.map(Number);

    let point1 = {x:x1, y:y1};
    let point2 = {x:x2, y:y2}; 
    let point0 = {x:0, y:0};
    checkDistanceValidity(point1, point0);
    checkDistanceValidity(point2, point0);
    checkDistanceValidity(point1, point2);

    function checkDistanceValidity(a, b) {
        let distance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        let isValid = distance == Math.round(distance);
        let validation = isValid ? "valid" : "invalid";
        let result = `{${a.x}, ${a.y}} to {${b.x}, ${b.y}} is ${validation}`;
        console.log(result);
    }
    
}

checkValidity([3, 0, 0, 4]);
checkValidity([2, 1, 1, 1]);

//problem 7 - Treasure Locator
function treasureLocator(input) {
    input = input.map(Number);
    for (let i = 0; i < input.length; i += 2) {
        let point = {x: input[i], y: input[i+1]};
        checkTreasureLocations(point);
    }

    function checkTreasureLocations(point) {
        let tonga = {name: 'Tonga', xMin: 0, xMax: 2, yMin: 6, yMax: 8};
        let tuvalu = {name: 'Tuvalu', xMin: 1, xMax: 3, yMin: 1, yMax: 3};
        let tokelau = {name: 'Tokelau', xMin: 8, xMax: 9, yMin: 0, yMax: 1};
        let samoa = {name: 'Samoa', xMin: 5, xMax: 7, yMin: 3, yMax: 6};
        let cook = {name: 'Cook', xMin: 4, xMax: 9, yMin: 7, yMax: 8};
        let islands = [samoa, tuvalu, tonga, cook, tokelau];
        let foundTreasure = false;

        for (let island of islands) {
            if (checkLocation(point, island)) {
                foundTreasure = true;
                console.log(island.name);
                break;
            }
        }
        if (!foundTreasure) console.log("On the bottom of the ocean");
    }

    function checkLocation(point, island) {
        return point.x >= island.xMin && point.x <= island.xMax
            && point.y >= island.yMin && point.y <= island.yMax;
    }
}

treasureLocator([4, 2, 1.5, 6.5, 1, 3]);
treasureLocator([6, 4]);

//problem 8 - Trip Length
function tripLength(input) {
    input = input.map(Number);
    let points = [];

    for (let i = 0; i < input.length; i += 2) {
        points[i/2 + 1] = {x: input[i], y: input[i+1]};
    }

    let minDist = Number.MAX_VALUE;
    let minRoute = '';

    for (let a = 1; a <= 3; a++) {
        for (let b = 1; b <= 3; b++) {
            if(a != b) {
                for (let c = 1; c <= 3; c++) {
                    if(c != a && c != b) {
                        let dist = getDistance(points[a], points[b])
                                 + getDistance(points[b], points[c]);
                        if(dist < minDist) {
                            minDist = dist;
                            minRoute = `${a}->${b}->${c}: ${minDist}`;
                        }
                    }
                }
            }
        }
    }
    return minRoute;

    function getDistance(pointA, pointB) {
        return Math.sqrt(Math.pow(pointA.x - pointB.x, 2)
                       + Math.pow(pointA.y - pointB.y, 2));
    }
}

console.log(tripLength([0, 0, 2, 0, 4, 0]));
console.log(tripLength([5, 1, 1, 1, 5, 4]));
console.log(tripLength([-1, -2, 3.5, 0, 0, 2]));

//problem 9 - Radio Crystals
function radioCrystals(input) {
    let operations = ['Cut', 'Lap', 'Grind', 'Etch', 'X-ray'];
    let targetThickness = +input[0];
    let chunks = input.slice(1).map(Number);

    for(let chunk of chunks) {
        let operationsLog = [`Processing chunk ${chunk} microns`];

        for (let operation of operations) {
            if (chunk == targetThickness) break;
            [chunk, operationsLog] = processChunk(operation, chunk, operationsLog);
            // operationsLog.push(chunk);
        }
        operationsLog.push(`Finished crystal ${chunk} microns`);
        console.log(operationsLog.join('\n'));
    }

    function processChunk(operation, chunk, operationsLog) {
        let count = 0;
        switch (operation) {
            case 'Cut':
                while(chunk * 0.25 >= targetThickness) {
                    chunk *= 0.25;
                    count++;
                }
                [chunk, operationsLog] = updateLog(chunk, operation, count, operationsLog);
                break;
            case 'Lap':
                while(chunk * 0.8 >= targetThickness) {
                    chunk *= 0.8;
                    count++;
                }
                [chunk, operationsLog] = updateLog(chunk, operation, count, operationsLog);
                break;
            case 'Grind':
                while(chunk - 20 >= targetThickness) {
                    chunk -= 20;
                    count++;
                }
                [chunk, operationsLog] = updateLog(chunk, operation, count, operationsLog);
                break;
            case 'Etch':
                while(chunk - 2 >= targetThickness || chunk - 1 == targetThickness) {
                    chunk -= 2;
                    count++;
                }
                [chunk, operationsLog] = updateLog(chunk, operation, count, operationsLog);
                break;
            case 'X-ray':
                while(chunk + 1 <= targetThickness) {
                    chunk++;
                    count++;
                }
                [chunk, operationsLog] = updateLog(chunk, operation, count, operationsLog);
                break;
        }
        return [chunk, operationsLog];
    }

    function updateLog(chunk, operation, count, operationsLog) {
        if (count > 0) {
            operationsLog.push(`${operation} x${count}`);
            
            if (operation != 'X-ray') {
                operationsLog.push('Transporting and washing');
                chunk = Math.floor(chunk);
            }
        }
        return [chunk, operationsLog];
    }
}

radioCrystals([1375, 50000]);
radioCrystals([1000, 4000, 8100]);

//problem 10 - DNA Helix
function dnaHelix(num) {
    n = +num;
    let sample = 'ATCGTTAGGG';
    let len = sample.length;
    let count = 0;

    for (let row = 1; row <= n; row++) {
        switch(row % 4) {
            case 1: console.log(`**${sample[count++%len]}${sample[count++%len]}**`); break;
            case 0:
            case 2: console.log(`*${sample[count++%len]}--${sample[count++%len]}*`); break;
            case 3: console.log(`${sample[count++%len]}----${sample[count++%len]}`); break;
        }
    }
}

dnaHelix([4]);
dnaHelix([10]);

