//Promise
//==============
//Promise is to deal with asynchronouse in stead of call back
//resolve is similar with return
//reject is a return of error

//==============
/*
//Pattern 1 : creat promise and use with .then
const promise=
    new Promise((resolve,reject)=>{
        resolve('good');        //will look for .then
        //reject('bad');        //will look for .catch
    })
    .then(value_result=>{
        console.log(value_result);
    })
    .catch(value_reject=>{
        console.log(value_reject);
    })
//good    resolve -> .then
//bad     reject  -> .catch
*/
//===========================
/*
//Pattern 2 : creat a promise first , and user later
const promise=
    new Promise((resolve,reject)=>{
        resolve('good');
        //reject('bad');
    });
//use promise
    promise
        .then(value_result=>{
            console.log(value_result);
        })
        .catch(value_reject=>{
            console.log(value_reject);
        })
//good    resolve -> .then
//bad     reject  -> .catch
*/
//============================
/*
//Pattern 3 : throw will look for catch
const promise=
    new Promise((resolve,reject)=>{
        resolve('good');
        //reject('bad');
    });
//use promise
    promise                            
        .then(value_result=>{
            throw 'really bad'
            console.log(value_result);
        })
        .catch(value_reject=>{
            console.log(value_reject);
        })
//really bad    resolve -> .then -> throw  -> catch
*/
//========================

//Pattern 4 : multiple .then
//we must use promise for asynchronous
//promise should be follow by .then
//return or resolve will activate the next .then 

/*
//Option 1:
const fetch = require('node-fetch');
const promise=
    new Promise((resolve,reject)=>{
        resolve('good');
        //reject('bad');
    });
//use promise
    console.log("start");
    promise                           //2.   asynchronouse (promise)
        .then(value_result=>{         //2.1  resolve + callbacks 
            console.log(value_result) // callback (synchronous)
            return true               // callback (synchronous)
        })
        .then((data)=>{               // return + callbacks
            console.log(data)         // callback (synchronous)                             
            fetch('https://jsonplaceholder.typicode.com/todos/1')  //assynchronous (promise)
            .then(response => response.json())                     //resolve + callback (synchronous)
            .then((data)=>{console.log(data.title)})                     //return + callback (synchronous) 
        })                               
        .catch(value_reject=>{
            console.log(value_reject);
        })
    console.log('End Here')           //1 synchronous
    //End Here
    //good
    //true
    //delectus aut autem
*/
//---
/*
//Option 2: Chaining of .then  
// we can make multiple asynchronous to be sycchronous with promise+.then
// return or resolve will activate the next .then 
const fetch = require('node-fetch');
const promise=
    new Promise((resolve,reject)=>{
        resolve('good');
        //reject('bad');
    });
    //use promise
    console.log("start");
        promise                       //2.   asynchronouse # 1(promise)
        .then(value_result=>{         //2.1  resolve + callbacks 
            console.log(value_result) // callback (synchronous)              
            return;                   // callback (synchronous) + return  
        })
        .then(()=>{                
            console.log("data")       // callback (synchronous) + return       
            return                    // cut { rutrn } for short version   because ()=return    
        })
        .then(()=>
            fetch('https://jsonplaceholder.typicode.com/todos/1')  //assynchronous (promise) + resolve
        )   
        .then(response => response.json())
        .then(data=>console.log(data.title))                       //callback (synchronous) 
        .then(()=>
            fetch('https://jsonplaceholder.typicode.com/todos/2')
        )
        .then(response => response.json())                         //callback (synchronous) + return
        .then(data=>console.log(data.title))  

        .catch(value_reject=>{
            console.log(value_reject);
        })
    console.log('End Here')           //1 synchronous
    //start
    //End Here
    //good
    //data
    //delectus aut autem
    //quis ut nam facilis et officia qui
*/
//================
/*
// in case you want to make sure total 100% synchronous 
// Promise.resolve(null) .then .then .then
Promise.resolve(null)
    .then(()=>              
        console.log("A")       // callback (synchronous) + return                                  
    )
    .then(()=>              
        console.log("B")       // callback (synchronous) + return                                  
    )
    .then(()=>              
        console.log("C")       // callback (synchronous) + return                                  
    )
    .then(()=>              
        console.log("D")       // callback (synchronous) + return                                  
    )
//A
//B
//C
//D
*/
//====================
/*
//From ch4, we will modify these code
//this is nested callback 
//this is "Callback Hell"
//below function no error handling also

const fs=require('fs');
fs.readFile('ch4/ch4test.txt',(err,data)=>{    
    fs.writeFile('ch4/ch4write.txt',data.toString(),(err,data)=>{  
        fs.readFile('ch4/ch4write.txt',(err,data)=>{
            console.log(data.toString());
        });
    });      
});
console.log('here') 
//ch4test
*/
//=============
/*
//Rewrite above call back to synchronouse pattern
const fs=require('fs');

//make fs.readFile to be synchronous
const SyncReadFile = filename => {
    return new Promise((resolve,reject)=>{        //Do not forget return
        fs.readFile(filename,(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })//readFile
    })//new Promise
} //SyncReadFile
//make fs.writeFile to be synchronous

const SyncWriteFile =(filename,input)=> {
    return new Promise((resolve,reject)=>{           // Do not forget return 
        fs.writeFile(filename,input,(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })//witeFile
    })//new Promise
}//SyncWriteFile
//--------
//let use it
SyncReadFile('ch4/ch4test.txt')
    .then(result=>result.toString())
    .then(result=>result)
    .then(result=>SyncWriteFile('ch4/ch4write.txt',result))
    .then(()=>SyncReadFile('ch4/ch4write.txt'))
    .then(result=>result.toString())
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
//ch4test
*/
//====================
/*
// Promisify 
// Make your life easy
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function doFile() {
    try {
        const text = await readFile('ch4/ch4test.txt', 'utf8');
        console.log(text);
    } catch (err) {
        console.log('Error', err);
    }
}
doFile();
//ch4test
*/
//=========================
/*
//Promistify 
const fs = require('fs');
const util = require('util');
const simpleReadFile = util.promisify(fs.readFile);
const simpleWriteFile = util.promisify(fs.writeFile);

simpleReadFile('ch4/ch4test.txt')
    .then(result=>result.toString())
    .then(result=>simpleWriteFile('ch4/ch4write.txt',result))
    .then(()=>simpleReadFile('ch4/ch4write.txt'))
    .then(result=>result.toString())
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
//ch4test
*/
//=========================
/*
//Async & Await
//with 1 synchronouse
const fs = require('fs');
const util = require('util');
const simpleReadFile = util.promisify(fs.readFile);
const simpleWriteFile = util.promisify(fs.writeFile);

async function doFile() {
    try {
        let result = await simpleReadFile('ch4/ch4test.txt');
        result = await result.toString();
        result = await simpleWriteFile('ch4/ch4write.txt',result)
        result = await simpleReadFile('ch4/ch4write.txt')
        result = await result.toString();
        console.log(result)
    } catch (err) {
        console.log(err);
    }
}
doFile();
//ch4test
*/
//==========================
/*
//However 1 synchronous take time a lot
//We can run paralelly in node as well
const fs = require('fs');
const util = require('util');
const simpleReadFile = util.promisify(fs.readFile);

Promise                                    // run all promises
    .all([                                 
        simpleReadFile('ch4/stuff1.txt'),
        simpleReadFile('ch4/stuff2.txt'),
        simpleReadFile('ch4/stuff3.txt'),
    ])
    .then(data=>{                         // result keep in array
        const [data1,data2,data3]=data;
        console.log(data1.toString());
        console.log(data2.toString());
        console.log(data3.toString());
    })
//1
//2
//3
*/
//====================
//real project
// Most of module provide promise function
// or create own promise 
/*
const {challenge_id} = req.params;           //we get id from req.params

return db.challenges                         //db.challenges -- this is database
            .find_one({                      //command in sql to find_one, this is promise (normal)
                where:{challenge_id}           
            })
            .then(challenge=>{               //challenge is object that we found 
                if(!challenge) return res.redirect('back');

                return res.view({            
                    challenge
                });
            })
            .catch((e)=>{
                console.log(e)
            })
*/