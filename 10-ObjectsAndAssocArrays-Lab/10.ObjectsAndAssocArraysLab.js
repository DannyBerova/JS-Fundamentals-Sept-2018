//problem 1 - Towns to JSON
function townsInJSON(towns) {
    let pattern = /\s*\|\s*/;
    let keys = towns[0].split(pattern).filter(x => x!=='');
    let townsArr = [];
    for (let town of towns.slice(1)) {
        let [townName, latitude, longitude] = town.split(pattern).filter(x => x!=='');
        let townObj = { [keys[0]]: townName,
                        [keys[1]]: Number(latitude),
                        [keys[2]]: Number(longitude) };
        townsArr.push(townObj);
    }
    return JSON.stringify(townsArr);
}

console.log(townsInJSON(
    ['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']));

console.log(townsInJSON(
    ['| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
'| Monatevideo | 34.50 | 56.11 |']));

//problem 2 - Score to HTML
function scoreToHTML(inputJSON) {
    let table = '<table>\n' +
                '  <tr><th>name</th><th>score</th></tr>\n';
    let arr = JSON.parse(inputJSON);

    for (let obj of arr)
        table += `  <tr><td>${htmlEscape(obj['name'])}</td>` +
                       `<td>${htmlEscape(obj['score'])}</td></tr>\n`;
    table += '</table>';
    return table;

    function htmlEscape(text) {
        text = '' + text;
        return text.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
    }
}

console.log(scoreToHTML('[{"name":"Pesho","score":70}]'));
console.log(scoreToHTML('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]'));
console.log(scoreToHTML('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]'));


//problem 3 - From JSON to HTML Table
function jsonToHtmlTable(inputJSON) {
    let arr = JSON.parse(inputJSON);
    let keys = Object.keys(arr[0]);

    let table = '<table>\n' + '  <tr>';
    for (let key of keys) {
        table += `<th>${htmlEscape(key)}</th>`;
    }
    table += '</tr>\n';

    for (let obj of arr) {
        table += '  <tr>';
        for (let key of keys) {
            table += `<td>${htmlEscape(obj[key])}</td>`;
        }           
        table += '</tr>\n';
    }

    table += '</table>';
    return table;

    function htmlEscape(text) {
        text = '' + text;
        return text.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
    }
}

console.log(jsonToHtmlTable('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]'));
console.log(jsonToHtmlTable('[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"},{"Name":"Gosho","Age":18,"City":"Plovdiv"},{"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]'));

//problem 4 - Sum by Town
function sumByTown(arr) {
    let townIncomes = {};
    for (let i = 0; i < arr.length; i += 2) {
        let [town, income] = [arr[i], +arr[i+1]];
        if (!townIncomes[town]) {
            townIncomes[town] = 0;
        }
        townIncomes[town] += income;
    }
    return JSON.stringify(townIncomes);
}

console.log(sumByTown( ['Sofia', '20',
            'Varna', '3',
            'Sofia', '5',
            'Varna', '4']));

console.log(sumByTown( ['Sofia', '20',
            'Varna', '3',
            'sofia', '5',
'varna', '4']));

//problem 5 - Count Words in a Text
function countWordsInText(text) {
    let words = text[0]
                .split(/\W+/g)
                .filter(x => x !== '');
    let countedWords = {};

    for (let word of words) {
            countedWords[word] ? countedWords[word]++ : countedWords[word] = 1;
    }
    return JSON.stringify(countedWords);
}

console.log(countWordsInText(["Far too slow, you're far too slow."]));
console.log(countWordsInText(["JS devs use Node.js for server-side JS. JS devs use JS. -- JS for devs --"]));

//problem 6 - Count Words with Maps
function countWordsWithMaps(text) {
    let words = text[0].toLowerCase()
                    .split(/\W+/g)
                    .filter(x => x != '');
    let wordsCount = new Map();
    for (let word of words)
        wordsCount.has(word) ? wordsCount.set(word, wordsCount.get(word) + 1) : wordsCount.set(word, 1);
    Array.from(wordsCount.keys()).sort()
        .forEach(word => console.log(`'${word}' -> ${wordsCount.get(word)} times`));
}

countWordsWithMaps(["Far too slow, you're far too slow."]);
countWordsWithMaps(["JS devs use Node.js for server-side JS. JS devs use JS. -- JS for devs --"]);

//problem 7 - Populations in Towns
function populationInTowns(arr) {
    let populationByTown = new Map();
    arr.forEach(line => {
        let [town, population] = line.split(/\s+<->\s+/);
        population = +population;
        if (!populationByTown.has(town)) {
            populationByTown.set(town, population);
        } else {
            populationByTown.set(town, populationByTown.get(town) + population);
        }
    });
    for (let [town, population] of populationByTown) {
        console.log(`${town} : ${population}`);
    } 
}

populationInTowns([
    'Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000'
]);

populationInTowns([
    'Istanbul <-> 100000',
    'Honk Kong <-> 2100004',
    'Jerusalem <-> 2352344',
    'Mexico City <-> 23401925',
    'Istanbul <-> 1000'
]);

//problem 8 - City Markets
function cityMarkets(sales) {
    let townSales = new Map();
    for (let sale of sales) {
        let [town, product, sales, unitPrice] = sale.split(/ -> | : /);

        if (!townSales.has(town)) {
            townSales.set(town, new Map);
        }
            
        let productRevenue = +sales * +unitPrice;

        if (townSales.get(town).has(product)) {
            productRevenue += townSales.get(town).get(product);
        }
        townSales.get(town).set(product, productRevenue);
    }

    for (let [town, townProducts] of townSales) {
        console.log(`Town - ${town}`);
        for (let [product, productRevenue] of townProducts) {
            console.log(`$$$${product} : ${productRevenue}`);          
        }
    }
}

cityMarkets([
    'Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3'
]);

//problem 9 - Lowest Prices in Cities
function lowestPricesInCities(arr) {
    let productPrices = new Map;
    for (let line of arr) {
        let [town, product, price] = line.split(/\s+\|\s+/);
        if (!productPrices.has(product)) {
            productPrices.set(product, new Map);
        }
            
        productPrices.get(product).set(town, +price);
    }

    for (let [product, townPrices] of productPrices) {
        let sortedTowns = Array.from(townPrices.keys())
                                .sort((k1, k2) => {
                                    return townPrices.get(k1) - townPrices.get(k2);
                                })
        console.log(`${product} -> ${townPrices.get(sortedTowns[0])} (${sortedTowns[0]})`);
    }
}

lowestPricesInCities([
   'Sample Town | Sample Product | 1000',
   'Sample Town | Orange | 2',
   'Sample Town | Peach | 1',
   'Sofia | Orange | 3',
   'Sofia | Peach | 2',
   'New York | Sample Product | 1000.1',
   'New York | Burger | 10'
]);

//problem 10 - Extract Unique Words
function extractUniqueWords(arr) {
    let uniqueWords = new Set();
    arr.forEach((line) =>  line
        .match(/\b\w+\b/g)
        .forEach(word => uniqueWords.add(word.toLowerCase()))
        );
    return [...uniqueWords].join(', ');
}

console.log(extractUniqueWords([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.',
    'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
    'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.',
    'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.',
    'Morbi in ipsum varius, pharetra diam vel, mattis arcu.',
    'Integer ac turpis commodo, varius nulla sed, elementum lectus.',
    'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.'
]));

console.log(extractUniqueWords([
    'Interdum et malesuada fames ac ante ipsum primis in faucibus.',
    'Vestibulum volutpat lacinia blandit.',
    'Pellentesque dignissim odio in hendrerit lacinia.',
    'Vivamus placerat porttitor purus nec hendrerit.',
    'Aliquam erat volutpat. Donec ac augue ligula.',
    'Praesent venenatis sapien vitae libero ornare, nec pulvinar velit finibus.',
    'Proin dui neque, rutrum vel dolor ut, placerat blandit sapien.',
    'Pellentesque at est arcu.',
    'Nullam eget orci laoreet, feugiat nisi vitae, egestas libero.',
    'Pellentesque pulvinar aliquet felis.',
    'Interdum et malesuada fames ac ante ipsum primis in faucibus.',
    'Etiam sit amet nisl ex.',
    'Sed lacinia pretium metus quis fermentum.',
    'Praesent a ante suscipit, efficitur risus cursus, scelerisque risus.'
]));