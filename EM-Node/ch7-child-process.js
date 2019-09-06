//Child Process
//build-in module in NodeJS
//To call system to exec script to run other-program command or system command  
//Since outside command can be asynchronouse, nodejs can handle that well
//
// Async + Buffer output 
/*
const cp=require('child_process');

const exec_options={
    cwd:null,              //cwd = current working directory 
    env:null,              //env = environment variable
    encodeing:'utf8',
    timeout:0,
    maxBuffer:200*1024,     //Buffer to keep result of bash script 
    killSignal:'SIGTERM'    //signal to kill process after timeout 
}
*/
//-----------------
//Not use due to blocking
/*
//exec bash script    = asynchronous  normally we use async way
cp.exec('ls',exec_options,(err,stdout,stderr)=>{        //'ls' is mandatory , exec_options and callback are optional
    console.log('#1. exec');                            //this one is to show result of ls
    console.log(stdout);                                //err is operation fail of this cp.exec
})                                                      //stderr is from bash command , ls 
//#1. exec
//ch2-es6-syntax.js                                     //cp.exec will buffer output after buffer complete, it return to console.log
//ch3-server.js
//package.json
*/
//------------------
/*
//exec sync        = synchronous will block your whole application , until it is done
try{
    const data = cp.execSync('ls',exec_options);     // it will return only stdout,stderr
    console.log('#2 exec sync')
    console.log(data.toString());
}
catch(e){
    console.log(e)
}
*/
//==============================
//spawn
//spawn have many realtime call back, it real time listen stdout, stderr with .on  
//it dirrectly receive stdout,stderr from childprocess in realtime (no use buffer)
//after child process end it provide 'close'
//in Node JS we use .on is to listen to event 
// Async + Stream on Event (No Buffer)
const cp=require('child_process');
const spawn_options={
    cwd:null,
    env:null,
    detached:false
}
//
const ls = cp.spawn('ls',['-l'],spawn_options);  //'ls' is manditory,     ['-l'] and spawn_options are optional

ls.stdout.on('data',stdout=>{    // ls.stdout stream have event of 'data ' and pass stdout to callback 
    console.log('#3. span');
    console.log(stdout.toString());
})

ls.stderr.on('data',stderr=>{
    console.log(stderr.tostring())
})

ls.on('close',code=>{
    console.log(code);
})

//=====================
//spawn sync 
const {stdout,stderr,pid,status} = cp.spawnSync('ls',['-l'],spawn_options);   //it will block and wait to get a whole stdout & stderr (not buffer stream) 
console.log('#4 spawn sync');                        //it return object of stdout,stderr,pid,status  which more than execsync
console.log(stdout.toString());
