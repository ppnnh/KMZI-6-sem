let generate=(count)=>{
    let k=[]
    let sum=3
    for (let i=0;i<count;i++){
        let value=sum+1
        k[i]=value
        if (i==0){
            sum+=k[i]
        }
        while(k[i]<sum){
            k[i]+=value
        }
        sum+=k[i]
    }
    return k
}


let generateNormal=(d, a, n, z)=>{
    let e=[]
    for (let i=0;i<z;i++){
        e[i]=(d[i]*a)%n
    }
    return e
}

function encode(e, M, z) {
    let j = 0;
    let result = new Array(M.length);
    let total = 0;
    // console.log("Исходное сооб M: ");
    for (let i = 0; i < M.length; i++) {
      total = 0;
      let Mi2 = '0' + M.charCodeAt(i).toString(2); //110010
    //   console.log(`${Mi2} `);
      for (let k = 0; k < Mi2.length; k++) {
        if (Mi2[k] == '1') total += e[k];
      }
      result[j] = total;
      j++;
    }
    return result;
  }
  function decode(d, Si, z) {
    let res = "";
    let res2 = "";
    for (let i = z; i > 0; i--) {
      if (Si >= d[i - 1]) {
        res += '1';
        Si = Si - d[i - 1];
      } else {
        res += '0';
      }
    }
    for (let i = res.length - 1; i > -1; i--) {
      res2 += res[i];
    }
    return res2;
  }
function convert(msg) {
    let result=[]
    for (var i = 0; i < msg.length; i++) {
        result[i] = "1"+msg[i].charCodeAt(0).toString(2);
    }
    return result
  }
// console.log(convert("BurankoValeria"))


console.log("private key d:")
let d=generate(8)
console.log(d)

console.log("public key e:")
let e=generateNormal(generate(8),31,420,8)
console.log(e)

console.log("Encoded:")
console.log(encode(e,"BurankoValeria"))


function a_1(a, n) {
    let res = 0;
    for (let i = 0; i < 10000; i++) {
      if ((a * i) % n === 1) {
        return i;
      }
    }
    return res;
  }
let a=a_1(31,420)
let C=encode(e,"BurankoValeria")
const S = new Array(C.length);
let M2 = "";
for (let i = 0; i < C.length; i++) {
  S[i] = (C[i] * a) % 420;
}
for (const Si of S) {
  const M2i = decode(d, Si, 8); 
  M2 += M2i + " ";
}
console.log("Decoded:")
console.log(M2)
//------------------------------------------------------------
// console.log("8")
// let t0 = performance.now();
// encode(e,"BurankoValeria")
// let t1 = performance.now();
// console.log(t1 - t0, 'milliseconds');


// e=generateNormal(generate(15),11,59384,15)
// console.log("15")
//  t0 = performance.now();
// encode(e,"BurankoValeria")
// t1 = performance.now();
// console.log(t1 - t0, 'milliseconds');

// e=generateNormal(generate(23),11,49499383,23)
// console.log("23")
//  t0 = performance.now();
// encode(e,"BurankoValeria")
// t1 = performance.now();
// console.log(t1 - t0, 'milliseconds');

