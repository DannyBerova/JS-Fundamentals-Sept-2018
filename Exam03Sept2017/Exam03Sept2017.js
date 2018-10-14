//problem 1 - The Hungry Programmer
function processFood(food, commands) {
    let eaten = [];
    let result = [];
    for (let command of commands) {
        command = command.trim()
        if (command === ('End')) {
            break;
        }
        if (command === 'Serve') {
            if(food.length > 0) {
                let meal = food.pop();
                console.log(`${meal} served!`);
            }
        } else if (command.startsWith('Add')) {
            let [comm, portion] = command.split(' ').filter(t => t !== '')
            if(portion)
            food.unshift(portion);
        } else if (command.startsWith('Shift')) {
            let [comm, firstInd, secondInd] = command.split(' ').filter(t => t !== '');
            if(firstInd < food.length && firstInd >= 0 &&
                secondInd < food.length && secondInd >= 0) {
                let firstMeal = food.slice(firstInd, firstInd + 1);
                let secondMeal = food.slice(secondInd, secondInd + 1);
                food[firstInd] = secondMeal[0];
                food[secondInd] = firstMeal[0];
                }
        } else if (command === 'Eat') {
            if(food.length > 0) {
                let meal = food.shift();
                console.log(`${meal} eaten`);
                eaten.push(meal);
            }
        } else if (command.startsWith('Consume')) {
            let [comm, startInd, endInd] = command.split(' ').filter(t => t !== '');
            if(startInd <= endInd && startInd < food.length && startInd >= 0 &&
                endInd < food.length && endInd >= 0) {
                    let meals = food.splice(startInd, endInd - startInd + 1);
                    eaten = eaten.concat(meals);
                    console.log('Burp!')
                }
        } else {
            continue;
        }
    }

    if (food.length > 0) {
        console.log(`Meals left: ${food.join(', ')}`);
    } else {
        console.log('The food is gone')
    }
    console.log(`Meals eaten: ${eaten.length}`);
}

processFood(
    ['chicken', 'steak', 'eggs'],
    ['Serve',
    'Eat',
    'End',
    'Consume 0 1']
);

processFood(
    ['fries', 'fish', 'beer', 'chicken', 'beer', 'eggs'],
    ['Add spaghetti',
     'Shift 0 1',
     'Consume 1 4',
     'End']    
);

processFood(
    ['carrots', 'apple', 'beet'],
    ['Consume 0 2',
    'End',]
);

//problem 2 - Expedition
//credits - RAstardzhiev at GitHub
function findPath(matrix, secondaryMAtrix, overlayCoordinates, startPosition) {
    let isInMatrix = (row, col) => row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
    overlayMatrices();
    let stepsCount = 0;
    let lastPosition = [];
    tryFindHome(startPosition[0], startPosition[1]);

    // Print results
    let result = '';
    if (lastPosition.length === 0) {
        deadEnd(startPosition[0], startPosition[1]);
    } else {
        stepsCount++;

        if (lastPosition[0] === 0) {
            result = 'Top';
        } else if (lastPosition[0] === matrix.length - 1) {
            result = 'Bottom';
        } else if (lastPosition[1] === 0) {
            result = 'Left';
        } else if (lastPosition[1] === matrix[0].length - 1) {
            result = 'Right';
        } else {
            result = deadEnd(lastPosition[0], lastPosition[1]);
        }
    }

    console.log(stepsCount + '\n' + result);

    function deadEnd(row, col) {
        // Quadrants Scheme
        // | 2 | 1 |
        // | 3 | 4 |
        let isLeftSide = col < matrix[0].length / 2; // Quadrants 2 and 3
        let isUpperSide = row < matrix.length / 2 // Quadrants 2 and 1
        let quadrant = 0;

        if (isLeftSide) {
            if (isUpperSide) {
                quadrant = 2;
            } else {
                quadrant = 3;
            }
        } else {
            if (isUpperSide) {
                quadrant = 1;
            } else {
                quadrant = 4;
            }
        }

        return `Dead end ${quadrant}`;
    }

    function tryFindHome(row, col) {
        matrix[row][col]--;

        let left = [row, col - 1];
        let right = [row, col + 1];
        let up = [row - 1, col];
        let down = [row + 1, col];

        if (isInMatrix(left[0], left[1]) && matrix[left[0]][left[1]] === 0) {
            makeAStep(left);
        } else if (isInMatrix(right[0], right[1]) && matrix[right[0]][right[1]] === 0) {
            makeAStep(right);
        } else if (isInMatrix(up[0], up[1]) && matrix[up[0]][up[1]] === 0) {
            makeAStep(up);
        } else if (isInMatrix(down[0], down[1]) && matrix[down[0]][down[1]] === 0) {
            makeAStep(down);
        }

        function makeAStep(position) {
            lastPosition = position;
            stepsCount++;
            tryFindHome(position[0], position[1]);
        }
    }

    function overlayMatrices() {
        for (const line of overlayCoordinates) {
            let [startingRow, startingCol] = line;

            for (let i = 0; i < secondaryMAtrix.length; i++) {
                for (let j = 0; j < secondaryMAtrix[i].length; j++) {
                    if (secondaryMAtrix[i][j] === 1) {
                        let currentRow = i + startingRow;
                        let currentCol = j + startingCol;

                        if (isInMatrix(currentRow, currentCol)) {
                            matrix[i + startingRow][j + startingCol]++;
                            matrix[i + startingRow][j + startingCol] %= 2;
                        }
                    }
                }
            }
        }
    }
}

findPath(
[[1, 1, 0, 1],
 [0, 1, 1, 0],
 [0, 0, 1, 0],
 [1, 0, 1, 0]],
[[0, 0, 1, 0, 1],
 [1, 0, 0, 1, 1],
 [1, 0, 1, 1, 1],
 [1, 0, 1, 0, 1]],
[[0, 0],
 [2, 1],
 [1, 0]],
[2, 0]
);

findPath(
[[1, 1, 0, 1, 1, 1, 1, 0],
 [0, 1, 1, 1, 0, 0, 0, 1],
 [1, 0, 0, 1, 0, 0, 0, 1],
 [0, 0, 0, 1, 1, 0, 0, 1],
 [1, 0, 0, 1, 1, 1, 1, 1],
 [1, 0, 1, 1, 0, 1, 0, 0]],
[[0, 1, 1],
 [0, 1, 0],
 [1, 1, 0]],
[[1, 1],
 [2, 3],
 [5, 3]],
[0, 2]
);

//problem 3 - Lost
function lost(keyword, input) {
    let pattern = new RegExp(`${keyword}(\.*)${keyword}`);
    let message = input.match(pattern);
    let patternCoords =/(north|east){1}[^\d]*([\d]{2})[^,]*,[^\d]*([\d]{6})/igm;
    let collectionLat = [];
    let collectionLong = [];
    let exec;
    while(exec = patternCoords.exec(input)) {
        if(exec[1] && exec[1].toLowerCase() === 'north') {
            collectionLat.push(exec[2] + '.' + exec[3]);
        } else {
            collectionLong.push(exec[2] + '.' + exec[3]);
        }
    }

    console.log(`${collectionLat[collectionLat.length-1]} N`);
    console.log(`${collectionLong[collectionLong.length-1]} E`);
    console.log(`Message: ${message[1]}`)
}

console.log(lost(
    '<>',
'o u%&lu43t&^ftgv><nortH4276hrv756dcc,  jytbu64574655k <>ThE sanDwich is iN the refrIGErator<>yl i75evEAsTer23,lfwe 987324tlblu6b'
));
console.log(lost(
    '4ds',
    'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532'
    ));

//problem 4 - Rest House
//credits - RAstardzhiev at GitHub
function orderGuests(rooms, guestPairs) {
    for (let i = 0; i < rooms.length; i++) {
        rooms[i].guests = [];
         rooms[i].type === 'triple' ? rooms[i].emptyBeds = 3 : rooms[i].emptyBeds = 2;
    }

    let teaHouse = 0;

    while (guestPairs.length > 0) {
        let pair = guestPairs.shift();

        let isPairSettled = false;
        if (pair.first.gender === pair.second.gender) {
            let room = getAppropriateRoom(r => r.type === 'triple' && r.guests.length < 3 && (r.guests.length === 0 || r.guests[0].gender === pair.first.gender));
            if (room) {
                room.guests.push(pair.first);
                room.emptyBeds--;

                if (room.guests.length === 3) {
                    room = getAppropriateRoom(r => r.type === 'triple' && r.guests.length < 3 && (r.guests.length === 0 || r.guests[0].gender === pair.second.gender));
                    if (room) {
                        room.guests.push(pair.second);
                        room.emptyBeds--;
                    } else {
                        teaHouse++;
                    }
                } else {
                    room.guests.push(pair.second);
                    room.emptyBeds--;
                }

                isPairSettled = true;
            }
        } else {
            let room = getAppropriateRoom(r => r.type === 'double-bedded' && r.guests.length === 0);
            if (room) {
                room.guests = [pair.first, pair.second];
                room.emptyBeds = 0;
                isPairSettled = true;
            } 
        }

        if (!isPairSettled) {
            teaHouse += 2;
        }
    }

    // Print Rooms
    let result = '';
    for (const r of rooms.sort((a, b) => a.number < b.number ? -1 : a.number > b.number ? 1 : 0)) {
        result += `Room number: ${r.number}\n`;

        for (const g of r.guests.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
            result += `--Guest Name: ${g.name}\n`;
            result += `--Guest Age: ${g.age}\n`;
        }

        result += `Empty beds in the room: ${r.emptyBeds}\n`;
    }

    result += `Guests moved to the tea house: ${teaHouse}`;
    console.log(result);

    function getAppropriateRoom(func) {
        for (const r of rooms) {
            if (func(r)) {
                return r;
            }
        }

        return null;
    }
}

orderGuests(
    [{ number: '206', type: 'double-bedded' },
    { number: '311', type: 'triple' }],

    [{
        first: { name: 'Tanya Popova', gender: 'female', age: 24 },
        second: { name: 'Miglena Yovcheva', gender: 'female', age: 23 }
    },
    {
        first: { name: 'Katerina Stefanova', gender: 'female', age: 23 },
        second: { name: 'Angel Nachev', gender: 'male', age: 22 }
    },
    {
        first: { name: 'Tatyana Germanova', gender: 'female', age: 23 },
        second: { name: 'Boryana Baeva', gender: 'female', age: 22 }
    }]
);

console.log();

orderGuests(
    [{ number: '101A', type: 'double-bedded' },
    { number: '104', type: 'triple' },
    { number: '101B', type: 'double-bedded' },
    { number: '102', type: 'triple' }],

    [{
        first: { name: 'Sushi & Chicken', gender: 'female', age: 15 },
        second: { name: 'Salisa Debelisa', gender: 'female', age: 25 }
    },
    {
        first: { name: 'Daenerys Targaryen', gender: 'female', age: 20 },
        second: { name: 'Jeko Snejev', gender: 'male', age: 18 }
    },
    {
        first: { name: 'Pesho Goshov', gender: 'male', age: 20 },
        second: { name: 'Gosho Peshov', gender: 'male', age: 18 }
    },
    {
        first: { name: 'Conor McGregor', gender: 'male', age: 29 },
        second: { name: 'Floyd Mayweather', gender: 'male', age: 40 }
    }]
);