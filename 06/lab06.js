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
function changeSl(arr) {
  const x = arr.slice(1,arr.length);
  x.push(arr[0])
  return x;
}
function encoding (message, a, b, c){
  let rotorII=Array.from('AJDKSIRUXBLHWTMCQGZNPYFVOE')
  let rotorIII=Array.from('BDFHJLCPRTXVZNYEIWGAKMUSQO')
  let rotorV=Array.from('VZBRGITYUPSDNHLXAWMJQOFECK')
  let reflectorC=Array.from('AFBVCPDJEIGOHYKRLZMXNWTQSU')
  let alpabet=Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  for (let i=0; i<a; i++){
    rotorII=changeSl(rotorII)
  }
  for (let i=0; i<b; i++){
    rotorIII=changeSl(rotorIII)
  }
  for (let i=0; i<c; i++){
    rotorV=changeSl(rotorV)
  }
  let ind
  let result=[]

    //R
    ind=rotorV[alpabet.indexOf(message[0])]
    //M
    ind=rotorIII[alpabet.indexOf(ind)]
    //L
    ind=rotorII[alpabet.indexOf(ind)]
    //reflector
    if (reflectorC.indexOf(ind)%2==0){
      ind=reflectorC[reflectorC.indexOf(ind)+1]
    }
    else {
      ind=reflectorC[reflectorC.indexOf(ind)-1]
    }
    //L
    ind=alpabet[rotorII.indexOf(ind)]
    //M
    ind=alpabet[rotorIII.indexOf(ind)]
    //R
    ind=alpabet[rotorV.indexOf(ind)]
    result.push(ind)
    
    for (let i=1; i<message.length;i++){
      rotorII=changeSl(rotorII)
      rotorIII=changeSl(changeSl(rotorIII))
      rotorV=changeSl(changeSl(rotorV))
      //R
      ind=rotorV[alpabet.indexOf(message[i])]
      //M
      ind=rotorIII[alpabet.indexOf(ind)]
      //L
      ind=rotorII[alpabet.indexOf(ind)]
      //reflector
      if (reflectorC.indexOf(ind)%2==0){
        ind=reflectorC[reflectorC.indexOf(ind)+1]
      }
      else {
        ind=reflectorC[reflectorC.indexOf(ind)-1]
      }
      //L
      ind=alpabet[rotorII.indexOf(ind)]
      //M
      ind=alpabet[rotorIII.indexOf(ind)]
      //R
      ind=alpabet[rotorV.indexOf(ind)]
      result.push(ind)
    }
  return result
}
function decoding (message, a, b, c){
  let rotorII=Array.from('AJDKSIRUXBLHWTMCQGZNPYFVOE')
  let rotorIII=Array.from('BDFHJLCPRTXVZNYEIWGAKMUSQO')
  let rotorV=Array.from('VZBRGITYUPSDNHLXAWMJQOFECK')
  let reflectorC=Array.from('AFBVCPDJEIGOHYKRLZMXNWTQSU')
  let alpabet=Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  for (let i=0; i<a; i++){
    rotorII=changeSl(rotorII)
  }
  for (let i=0; i<b; i++){
    rotorIII=changeSl(rotorIII)
  }
  for (let i=0; i<c; i++){
    rotorV=changeSl(rotorV)
  }
  let ind
  let result=[]

    //R
    ind=rotorV[alpabet.indexOf(message[0])]
    //M
    ind=rotorIII[alpabet.indexOf(ind)]
    //L
    ind=rotorII[alpabet.indexOf(ind)]    
    //reflector
    if (reflectorC.indexOf(ind)%2==0){
      ind=reflectorC[reflectorC.indexOf(ind)+1]
    }
    else {
      ind=reflectorC[reflectorC.indexOf(ind)-1]
    }
    //L
    ind=alpabet[rotorII.indexOf(ind)]
     //M
     ind=alpabet[rotorIII.indexOf(ind)]
     //R
     ind=alpabet[rotorV.indexOf(ind)]
    
    
    result.push(ind)
    
    for (let i=1; i<message.length;i++){
      rotorII=changeSl(rotorII)
      rotorIII=changeSl(changeSl(rotorIII))
      rotorV=changeSl(changeSl(rotorV))
      //R
    ind=rotorV[alpabet.indexOf(message[i])]
    //M
    ind=rotorIII[alpabet.indexOf(ind)]
    //L
    ind=rotorII[alpabet.indexOf(ind)]    
    //reflector
    if (reflectorC.indexOf(ind)%2==0){
      ind=reflectorC[reflectorC.indexOf(ind)+1]
    }
    else {
      ind=reflectorC[reflectorC.indexOf(ind)-1]
    }
    //L
    ind=alpabet[rotorII.indexOf(ind)]
     //M
     ind=alpabet[rotorIII.indexOf(ind)]
     //R
     ind=alpabet[rotorV.indexOf(ind)]
      result.push(ind)
    }
  return result
}
console.log("0,0,0")
let enc0=encoding("VALERIYADMITRIEVNABURANKO",0,0,0).toString().replace(/[^A-Z]+/g, '')
console.log(enc0)
// console.log(probability(enc0,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
let dec0=decoding(enc0,0,0,0).toString().replace(/[^A-Z]+/g, '')
console.log(dec0)
// console.log(probability(dec0,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))

console.log("2,4,3")
let enc1=encoding("VALERIYADMITRIEVNABURANKO",2,4,3).toString().replace(/[^A-Z]+/g, '')
console.log(enc1)
// console.log(probability(enc1,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
let dec1=decoding(enc1,2,4,3).toString().replace(/[^A-Z]+/g, '')
console.log(dec1)
// console.log(probability(dec1,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))

console.log("4,1,2")
let enc2=encoding("VALERIYADMITRIEVNABURANKO",4,1,2).toString().replace(/[^A-Z]+/g, '')
console.log(enc2)
// console.log(probability(enc2,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
let dec2=decoding(enc2,4,1,2).toString().replace(/[^A-Z]+/g, '')
console.log(dec2)
// console.log(probability(dec2,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))

console.log("1,2,3")
let enc3=encoding("VALERIYADMITRIEVNABURANKO",1,2,3).toString().replace(/[^A-Z]+/g, '')
console.log(enc3)
// console.log(probability(enc3,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
let dec3=decoding(enc3,1,2,3).toString().replace(/[^A-Z]+/g, '')
console.log(dec3)
// console.log(probability(dec3,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))

console.log("3,2,4")
let enc4=encoding("VALERIYADMITRIEVNABURANKO",3,2,4).toString().replace(/[^A-Z]+/g, '')
console.log(enc4)
// console.log(probability(enc4,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
let dec4=decoding(enc4,3,2,4).toString().replace(/[^A-Z]+/g, '')
console.log(dec4)
// console.log(probability(dec4,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))


