// выполнять зашифрование/расшифрование текстовых документов
//  (объемом не менее 5 тысяч знаков), созданных на основе 
//  алфавита языка в соответствии с нижеследующей таблицей 
//  вариантов задания; при этом следует использовать
//   шифры подстановки из третьего столбца данной 
//   таблицы (вариантызадания представленыв табл. 2.6);
//   РУССКИЙ. АФФИННАЯ СИСТЕМА ПОДСТАНОВОК ЦЕЗАРЯ (a=7, b=10)
//   Виженера. ключ-фамилия
let fs=require('fs');
let alphabet="АБВГДЕЖЗИЙКЛМНПРОСТУФХЦЧШЩЪЫЬЭЮЯ";
let a=7;
let b=10;
let text=fs.readFileSync("text.txt").toString().toUpperCase().replace(/[^А-Я]+/g, '');

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

function calcInverse(a, n) {
    for (var i = 1; i < n; i++) {
        if ((a * i) % n == 1)
            return i;
    }
    return 1;
}

let caesar={
    encrypt: function(alphabet, text) {
        var n = alphabet.length;
        var encryptedT = '';
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            var pos = alphabet.indexOf(c);
            if (pos < 0) {
                encryptedT += c; 
                continue;
            }
            var newPos = (parseInt(pos) * a + b) % n;
            var newC = alphabet.charAt(newPos);
            encryptedT += newC;
        }
        return encryptedT;
    },
    
    decrypt: function(alphabet, text) {
        var n = alphabet.length;
        var kInverse = calcInverse(a, n);
        var decryptedT = '';
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            var pos = alphabet.indexOf(c);
            if (pos < 0) {
                decryptedT += c; 
                continue;
            }
            var newPos = (kInverse * (parseInt(pos) + n - b)) % n;
            var newC = alphabet.charAt(newPos);
            decryptedT += newC;
        }
        return decryptedT;
    }
}
//------------------------------------------------------------------------
console.log("\u001b[1;31m TASK 1");
console.log("THE AFFINE CAESAR CIPHER \u001b[1;32m");

// console.log(`Encryption: ${caesar.encrypt(alphabet,text)}`);
fs.writeFileSync("encrCaesar.txt", caesar.encrypt(alphabet,text))

console.log(`ENCRYPTHION CAESAR:`)
// console.log(probability(caesar.encrypt(alphabet,text),alphabet))

let t0 = performance.now();
caesar.encrypt(alphabet,text)
let t1 = performance.now();
console.log(t1 - t0, 'milliseconds\u001b[1;32m');

// console.log(`Decription: ${caesar.decrypt(alphabet, caesar.encrypt(alphabet,text))}`) 
fs.writeFileSync("decrCaesar.txt",caesar.decrypt(alphabet, caesar.encrypt(alphabet,text)))

//---------------------------------------------------------------------------
console.log('DECRIPTION CAESER:')
// console.log(probability(caesar.decrypt(alphabet, caesar.encrypt(alphabet,text)),alphabet))

t0 = performance.now();
caesar.decrypt(alphabet,text)
t1 = performance.now();
console.log(t1 - t0, 'milliseconds');

console.log("\u001b[1;31m THE VIGENER CIPHER \u001b[1;32m");

 const numAlph = {}
for(let i = 0; i < alphabet.length; i++){
    numAlph[alphabet[i]] = i
  }
  
  function Encode(text, key){
    let code = ''
  
    for(let i = 0; i < text.length; i++){
      code += alphabet[(numAlph[text[i]] + numAlph[key[i % key.length]]) % alphabet.length]
    }
    return code
  }
  
  function Decode(text, key){
    let code = ''
  
    for(let i = 0; i < text.length; i++){
      code += alphabet[(numAlph[text[i]] - numAlph[key[i % key.length]] + alphabet.length) % alphabet.length]
    }
    return code
  }

let key="БУРАНКО"
// console.log(`Encription (key-${key}): `, Encode(text, key))
fs.writeFileSync("encrVigener.txt", Encode(text, key))

//---------------------------------------------------------------------------
console.log("ENCRIPTION VIGENER")
// console.log(probability(Encode(text,key),alphabet))

t0 = performance.now();
Encode(text, key)
t1 = performance.now();
console.log(t1 - t0, 'milliseconds\u001b[1;32m');

// console.log(`Decription (key-${key}): `, Decode(Encode(text, key), key))
fs.writeFileSync("decrVigener.txt", Decode(Encode(text, key), key))
console.log("DECRIPTION VIGENER")
// console.log(probability(Decode(Encode(text, key), key),alphabet))

t0 = performance.now();
Decode(Encode(text, key), key)
t1 = performance.now();
console.log(t1 - t0, 'milliseconds');
// console.log("count of letters: ",text.length)