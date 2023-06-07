const RSA = require('./rsa');


const message = 'Buranko Valeria';

const keys = RSA.generate(256);
console.log("RSA:")
console.log('Keys');
console.log('Public:', keys.n.toString());
console.log('Private:', keys.d.toString());
console.log('Exponenta:', keys.e.toString());

const encoded_message = RSA.encode(message);
const encrypted_message = RSA.encrypt(encoded_message, keys.n, keys.e);
const decrypted_message = RSA.decrypt(encrypted_message, keys.d, keys.n);
const decoded_message = RSA.decode(decrypted_message);

console.log('Message:', message);
console.log('Encoded:', encoded_message.toString());
console.log('Decoded:', decoded_message.toString());
// console.log('Encrypted:', encrypted_message.toString());
// console.log('Decrypted:', decrypted_message.toString());


console.log("RC4: ")
var rc4js = require("rc4js");
 
 
 var key = "76, 111, 85, 54, 211";
 var cipher = rc4js.createCipherByKey(key);
 
 
 // Text to encoding
 var txt = "Buranko Valeria";
 
 // Encrypt
 var result = cipher.update(txt);
 console.log("Encoded:");
 console.log(result);

 let t0 = performance.now();
cipher.update(txt)
let t1 = performance.now();
console.log(t1 - t0, 'milliseconds');

//Decrypt
 result = cipher.update(result);
 
 console.log("Decoded:");
 console.log(result.toString("binary"));

 t0 = performance.now();
cipher.update(result)
 t1 = performance.now();
console.log(t1 - t0, 'milliseconds');


 
 