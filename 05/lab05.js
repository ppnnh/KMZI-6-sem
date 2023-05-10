// 1. Маршрутная перестановка (маршрут –по
//     спирали; параметры таблицы – по указанию
//     преподавателя) 
//     2. Множественная перестановка, ключевые
//     слова – собственные имя и фамилия

let fs=require('fs');
let alphabet="АБВГДЕЖЗИЙКЛМНПРОСТУФХЦЧШЩЪЫЬЭЮЯ";

let text=fs.readFileSync("text.txt").toString().toUpperCase().replace(/[^А-Я]+/g, '').slice(0,625);

function probability(txt, alphabet){
    let prob = {}
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet.charAt(i);
        regExp = new RegExp(letter, 'g');
        if (txt.match(regExp) === null) {
            p=0;
        } 
        else {
            p=txt.match(regExp).length / txt.length;
        } 
        prob[letter]=p
        
    }
    return prob;
}

function get2dimensional(array, limit) {
    const array2 = [];
    let section;
  
    for (const [index, element] of array.entries()) {
      if (index % limit === 0) array2.push(section = []);
      section.push(element);
    }
  
    return array2;
}

//25x25
let txt=get2dimensional(Array.from(text),25)

function spiral(array) {
    var exitArray = [];
	while (array.length) {
		exitArray.push(...array.shift());

		array.map(row => exitArray.push(row.pop()));

		array.reverse().map(row => row.reverse());
	}
	return exitArray;
}

function despiral(mas,w, h) {
	let result = new Array(h).fill().map(() => new Array(w).fill(''));
	let counter = 0;
	let startCol = 0;
	let endCol = w - 1;
	let startRow = 0;
	let endRow = h - 1;
	while (startCol <= endCol && startRow <= endRow) {
		for (let i = startCol; i <= endCol; i++) {
			result[startRow][i] = mas[counter];
			counter++;
		}
		startRow++;
		for (let j = startRow; j <= endRow; j++) {
			result[j][endCol] = mas[counter];
			counter++;
		}

		endCol--;

		for (let i = endCol; i >= startCol; i--) {
			result[endRow][i] = mas[counter];
			counter++;
		}

		endRow--;
		for (let i = endRow; i >= startRow; i--) {
			result[i][startCol] = mas[counter];
			counter++;
		}

		startCol++;
	}

	return result;
}
//--------------------------------------------------------------------------------
console.log("\u001b[1;31m TASK 1");
console.log("THE SPIRAL CIPHER \u001b[1;32m");
console.log(`ENCRYPTHION:`)


fs.writeFileSync("spiral.txt",(spiral(txt).join('').replace(/[^А-Я]+/g, '')));

// console.log(probability(fs.readFileSync("spiral.txt").toString(),alphabet))

let t0 = performance.now();
spiral(txt).join('').replace(/[^А-Я]+/g, '')
let t1 = performance.now();
console.log(t1 - t0, 'milliseconds\u001b[1;32m');
//--------------------------------------------------------------------------------
console.log(`DECRYPTHION:`)

fs.writeFileSync("despiral.txt",despiral(Array.from(fs.readFileSync("spiral.txt").toString()),25,25).toString().replace(/[^А-Я]+/g, ''))


// console.log(probability(fs.readFileSync("despiral.txt").toString(),alphabet))

 t0 = performance.now();
 despiral(Array.from(fs.readFileSync("spiral.txt").toString()),25,25).toString().replace(/[^А-Я]+/g, '')
 t1 = performance.now();
console.log(t1 - t0, 'milliseconds\u001b[1;32m');

//--------------------------------------------------------------------------------

function crypt(message, colsKey, rowsKey){
	var result = [];

	var colsCount = colsKey.length; 
	var rowsCount = rowsKey.length; 
	for(var row = 0; row<rowsCount; row++) {
		for(var col = 0; col<colsCount; col++){ 
 			var newCol = colsKey[col]-1;
 			var newRow = rowsKey[row]-1;
 			result[newRow*colsCount + newCol] = message[row*colsCount + col];
		}
	}
    
	return result ;
}

function decrypt(message, colsKey, rowsKey){
	var result = [];

	var colsCount = colsKey.length; 
	var rowsCount = rowsKey.length; 
	for(var row = 0; row<rowsCount; row++) {
		for(var col = 0; col<colsCount; col++){ 
 			var newCol = colsKey[col]-1;
 			var newRow = rowsKey[row]-1;
 			result[row*colsCount + col] = message[newRow*colsCount + newCol];
		}
	}
	return result ;
}


//--------------------------------------------------------------------------------

console.log("\u001b[1;31m TASK 2");
console.log("THE MULTIPLE PERMUTATION CIPHER \u001b[1;32m");
console.log(`ENCRYPTHION:`)

// БУРАНКО-2761435, ВАЛЕРИЯ-2153647
fs.writeFileSync("mult.txt",  crypt(text,'2761435',"2153647").join('').replace(/[^А-Я]+/g, ''))


// console.log(probability(fs.readFileSync("mult.txt").toString(),alphabet))

 t0 = performance.now();
crypt(text,'2761435',"2153647").join('').replace(/[^А-Я]+/g, '')
 t1 = performance.now();
console.log(t1 - t0, 'milliseconds\u001b[1;32m');

//--------------------------------------------------------------------------------

console.log(`DECRYPTHION:`)

let mult=fs.readFileSync("mult.txt").toString()
fs.writeFileSync("demult.txt",  decrypt(mult,'2761435',"2153647").join('').replace(/[^А-Я]+/g, ''))


// console.log(probability(fs.readFileSync("demult.txt").toString(),alphabet))

t0 = performance.now();
decrypt(mult,'2761435',"2153647").join('').replace(/[^А-Я]+/g, '')
t1 = performance.now();
console.log(t1 - t0, 'milliseconds\u001b[1;32m');

// console.log("count of letters: ",text.length)