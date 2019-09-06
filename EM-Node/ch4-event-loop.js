//Important Point

//- Event Loop is single-thread
//- Event Loop lets Node.js achieve concurrency; not parallelism,
//  however,things that happent outside of your node program do occur in parallel
//  For example, node program run to request fs.readfile to linux , linux run readfile as parallel
//  after compleate read file it will return to node program (which run as concurrency as asynchronus)    


//Type of programs:
// 1. Synchronous (single-threaded) a cheif cook food each process from start-complete , and go to the next process 
// 2. Asynchronous (single-threaded w/ concurrency) a chief cook food multiple process by not to wait for each process to complete
// 3. Parallel (multi-threaded) have multiple cheif to cook each process

//============================
/*
//Basic event-llop
setTimeout(()=>{    //exec setTimeout
    console.log(1)  // send consol.log(1) to callback queue
},0);

console.log(2)      //exec console.log(2)
                    //exec callback console.log(1)
//2
//1
//
*/
//=============================
/*
//Event-loop with linux-parallel

const fs=require('fs');
fs.readFile('ch4/ch4test.txt',(err,data)=>{   //exec fs.readFile which is again send to linux to get file (linux parallel)
    console.log(data.toString());         //send console.log(data.toString()) to callback queue
})

console.log('here')                        //exec console.log('here')
                                           //when readFile complete exec console.log('here')
//here
//ch4test
*/
//==============================

/*
//this is nested callback 
//this is "Callback Hell"

const fs=require('fs');
fs.readFile('ch4/ch4test.txt',(err,data)=>{    
    fs.writeFile('ch4/ch4write.txt',data.toString(),(err,data)=>{  
        fs.readFile('ch4/ch4write.txt',(err,data)=>{
            console.log(data.toString());
        });
    });      
});
console.log('here') 
*/
//=================================
const fs=require('fs');

for(let i=0;i<10;++i){
    const filename=`ch4/stuff${i}.txt`
    fs.readFile(filename, (err,data)=>{    //fs.readFile is happen outside node, and it is parallel
        //const a = await data.toString().trim()
        console.log(data);    //result of them are unpredictable
    });                                         //Example of parallel outside node, reading file, network operation
}                                                //system command,   so call back happen not in order, happen when complete first

console.log('here');
//1                                               
//3
//2
//4
//6
//5
//7
//8
//9
//=============