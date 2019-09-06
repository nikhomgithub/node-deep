//Async is different from Promise
//Promise take a asynchronous action , register call back in call back queue
//Async function will await for return/resolve value.
//
//===========================
/*
//How to use async function
const fs = require('fs');
const util = require('util');
const simpleReadFile = util.promisify(fs.readFile);

const run = async ()=>{
    try{
        const data = await simpleReadFile('ch4/ch4test.txt');   //await for async-promise to resolve to data
        console.log(data.toString());
    }
    catch(e){
        console.log(e)
    }

}

run();
//ch4test
*/
//=============================
//async in front of normal function will turn it to me 
/*
function a(){
    return Promise.resolve('a')
}
async function b(){                // make this normal function as promise
    return 'c'
}

console.log(a());
console.log(b());

//Promise { 'a' }
//Promise { 'c' }
*/
//===========================
/*
//Promise all => to async/await
const fs = require('fs');
const util = require('util');
const simpleReadFile = util.promisify(fs.readFile);   //create promise function 

const run = async()=>{
    try{
        const [data1,data2,data3] = await Promise.all([        // program is freezing here
            simpleReadFile('ch4/stuff1.txt'),
            simpleReadFile('ch4/stuff2.txt'),
            simpleReadFile('ch4/stuff3.txt'),
        ]);
        console.log(data1.toString());
        console.log(data2.toString());
        console.log(data3.toString());
    }
    catch(e){             // we use try / catch to handle error
        console.log(e)
    }
};

run();
//1
//2
//3
*/
//===========================
//use await idea mean you need to wait 
//Some time you, do not to wait, it better to use .then (put thing on call back queue) so we do not need to wait 
//just skip to next line
//=========================

