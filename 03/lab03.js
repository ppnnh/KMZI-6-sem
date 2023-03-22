let n=553;
let m=521;

console.log("\u001b[1;31m TASK 1 \u001b[1;32m");
let arr=[];

nextPrime:
for (let i = 2; i <= n; i++) { 

  for (let j = 2; j < i; j++) { 
    if (i % j == 0) continue nextPrime; 
  }
    arr.push(i);
}
console.log(`Prime numbers [2;${n}]`)
console.dir(arr, {'maxArrayLength': null});
console.log(arr.length)

let compaire=(a,b)=>{
    let c=b/Math.log(b);
    if (a>c) {
        return `Length is greater ${a},  ${ c}`
    } else 
    if (c>a){
        return `Length is less ${a},  ${c}`
    } else {
        return `Length is equal to ${a},   ${c}`
    }
}
console.log(compaire(arr.length,n))

//--------------------------------------------------
console.log("\u001b[1;31m TASK 2 \u001b[1;32m");

let array=[];
nextPrime:
for (m; m <= n; m++) { 

  for (let j = 2; j < m; j++) { 
    if (m % j == 0) continue nextPrime; 
  }
    array.push(m);
}
m=521;
console.log(`Prime numbers [${m};${n}]`)

console.dir(array, {'maxArrayLength': null});
console.log(compaire(array.length,Math.sqrt(n)/Math.log(Math.sqrt(n))))
 


var eratosthenes = function(n) {
  var array = [], upperLimit = Math.sqrt(n), output = [];

  for (var i = 0; i < n; i++) {
      array.push(true);
  }

  for (var i = 2; i <= upperLimit; i++) {
      if (array[i]) {
          for (var j = i * i; j < n; j += i) {
              array[j] = false;
          }
      }
  }

  for (var i = 2; i < n; i++) {
      if(array[i]) {
          output.push(i);
      }
  }

  return output;
};
console.log("The sieve of eratosthenes")
console.log(`Prime numbers [2;${n}]`)
console.dir(eratosthenes(n), {'maxArrayLength': null});
console.log(compaire(eratosthenes(n).length,n));

console.log(`Prime numbers [${m};${n}]`)
console.log(eratosthenes(n).filter(el=>el>=m));
console.log(compaire(eratosthenes(n).filter(el=>el>=m).length,Math.sqrt(n)/Math.log(Math.sqrt(n))))
//-------------------------------------------------
console.log("\u001b[1;31m TASK 3 \u001b[1;32m");


let mul=(a, arr = [], b = 2)=> {
  if (b > Math.sqrt(a)) {
    arr.push(a);
    return arr;
  } else if (a % b == 0) {
    arr.push(b);
    mul(a / b, arr, b);
  } else {
    mul(a, arr, ++b);
  }

  result={}
  arr.forEach(function(a){
    result[a] = result[a] + 1 || 1;
  });

  let r=[]
  for (let i in result){
    if (result[i]!=1){
      r.push(`${i}^${result[i]}`);
    } else r.push(`${i}`);
  r.splice(i,0," * ");
  }
  r.pop();
  return r.toString().replace(/,/g,'');
}
console.log("Factorization")
console.log(`n: ${mul(n)}`);
console.log(`m: ${mul(m)}`);
//--------------------------------------------------
console.log("\u001b[1;31m TASK 4 \u001b[1;32m");

m=[521];
n=[553]
let p=m.concat(n)
p=p.toString().replace(/,/g,'')
console.log(`Concat m|n: ${p}`)

const isPrime = num => {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if(num % i === 0) return false;
  }
  return num > 1;
}
console.log(`IsPrime: ${isPrime(p)}`)
//--------------------------------------------------
console.log("\u001b[1;31m TASK 5 \u001b[1;32m");


let NOD=(arg)=> {
  for (var x = arg[0], i = 1; i < arg.length; i++) {
    var y = arg[i];
    while (x && y) {
      x > y ? x %= y : y %= x;
    }
    x += y;
  }
  return x;
}
console.log(`NOD(${m};${n})=${NOD([m,n])}`)
console.log(`NOD(3,6,9)=${NOD([3,6,9])}`)