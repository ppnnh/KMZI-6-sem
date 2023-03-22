let fs=require("fs");

let lattxt=fs.readFileSync("lat.txt");
let tadzhtxt=fs.readFileSync("tadzh.txt");
let binarytxt=fs.readFileSync("binary.txt");

let lat="AaĀāBbCcČčDdEeĒēFfGgĢģHhIiĪīJjKkĶķLlĻļMmNnŅņOoPpRrSsŠšTtUuŪūVvZzŽž";
let tadzh="АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЧчШшЪъЭэЮюЯяҒғӢӣҚқӮӯҲҳҶҷ";
let binary="01";

let shanon = (txt, alph) => {
    let H = 0;
    let sum = 0;
    for (let i = 0; i < alph.length; i++) {
        let letter = alph.charAt(i),
        regExp = new RegExp(letter, 'g');
        if (txt.match(regExp) === null) {
            p=0;
        } 
        else {
            p=txt.match(regExp).length / txt.length;
        } 
        //console.log(`{letter: '${letter}', P(${letter}) = ${p}}`);
        if (p !== 0) {
            H += p * Math.log2(p);
        }
        sum += p;
    }
    //console.log(`Sum of p: ${sum}`);
    return -H;
};
console.log("\u001b[1;31m Task 1: \u001b[1;32m  ");
console.log(`Entropy of lat: ${shanon(lattxt.toString(),lat)}\u001b[1;33m`);
console.log(`Entropy of tadzh: ${shanon(tadzhtxt.toString(),tadzh)}`);

console.log("\u001b[1;31m  Task 2: \u001b[1;32m");
console.log(`Entropy of binary: ${shanon(binarytxt.toString(),binary)}`);

console.log("\u001b[1;31m Task 3: \u001b[1;32m ");
let FIOtadzh="Буранко Валерия Дмитриевна";
console.log(`Count of information (tadzh): ${FIOtadzh.length*shanon(FIOtadzh,tadzh)} \u001b[1;33m`);

let convbinary=(txt)=>{
    let str;
    for (let i=0; i<txt.length; i++){
        str+=txt[i].charCodeAt(0).toString(2);
    }
    return str;
}

console.log(`Count of information (binary): ${convbinary(FIOtadzh).length*shanon(convbinary(FIOtadzh),binary)}\u001b[1;32m`);

let FIOlat="Buranco Valērija Dmitrievna";

console.log(`Count of information (lat): ${FIOlat.length*shanon(FIOlat,lat)} \u001b[1;33m`);
console.log(`Count of information (binary): ${convbinary(FIOlat).length*shanon(convbinary(FIOlat),binary)}`);

let condEntropy=(p)=>{
    let q=1-p;
    let H=(-p*Math.log2(p)-q*Math.log2(q));
    return H;
}

let countInfBinMist=(p,txt)=>{
    let count=(1-condEntropy(p))*convbinary(txt).length;
    return count;
}
console.log("\u001b[1;31m Task 4: \u001b[1;32m");
console.log(`FIOtadzh if p=0.1: ${countInfBinMist(0.1,FIOtadzh)}`);
console.log(`FIOtadzh if p=0.5: ${countInfBinMist(0.5,FIOtadzh)}`);
console.log(`FIOtadzh if p=1: ${countInfBinMist(0.99999999999,FIOtadzh)}\u001b[1;33m`);

console.log(`FIOlat if p=0.1: ${countInfBinMist(0.1,FIOlat)}`);
console.log(`FIOlat if p=0.5: ${countInfBinMist(0.5,FIOlat)}`);
console.log(`FIOlat if p=1: ${countInfBinMist(0.99999999999,FIOlat)}`);
