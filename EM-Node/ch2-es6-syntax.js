/*
//arrow function
var nums = [1,2,3,4];

nums.forEach((num,i)=>{
    console.log(num*10);
});
10
20
30
40

//old pattern function
nums.forEach(function(num,i){
    console.log(num*100);
})
100
200
300
400
*/
//======
/*
//block scoping with let
for (let i=1; i<=4;++i){
    setTimeout(()=>{
        console.log(i)
    },1000);
}
1
2
3
4
//var is out of block scope
for (var i=1; i<=4;++i){
    setTimeout(()=>{
        console.log(i)
    },1000);
}
5
5
5
5
*/
//=======
/*
//default params
function test1(a,b,c=3){
    console.log('default params result:',a+b+c)
}
test1(1,2);
//default params result: 6
test1(1,2,4);
//default params result: 7
*/
//========
/*
//variadic function arguments
function sum1(...nums){
    console.log('result 1 =',nums.reduce((acc,a)=>a+acc,0))
}

sum1(1,2,3,4);
//result 1 = 10

function sum2(x,y,...nums){
    console.log('result 2 =',nums.reduce((acc,a)=>a+acc,0))
}

sum2(1,2,3,4);
//result 2 = 7
*/
//==========
/*

//spread operator
var a=[1,2,3];
var b=[...a,4,5];
console.log(b)
//[ 1, 2, 3, 4, 5 ]
*/
//=============
/*
//property shorthand
var c='c';
var d='d';
var e={c,d}  //mean e={c:c, d:d}
console.log(e)
//{ c: 'c', d: 'd' }
*/
//===============
/*
//computed object keys
var name='something';

var object={
    [name]:'cool'
}
console.log(object.something);
//cool

var name='any thing';

var object={
    [name]:'hot'
}
console.log(object['any thing']);
//hot
*/
//==============
/*
//method notation in objects
var methods = {
    foo:function(){  // old way
        console.log('foo');
    },
    bar(){   // new way
        console.log('bar')
    },
    woo:()=>{  //half new
        console.log('woo')
    }
}
methods.foo();
methods.bar();
methods.woo();
//foo
//bar
*/
//=================
/*
//array destructuring
var nums=[1,2,3];
var [one,two,three]=nums;
console.log(one,two,three);
//1 2 3
//swap-a-roo
var [one,two]=[two,one];
console.log(one,two);
//2 1
*/
//=============
/*
//object destructuring
var nums={one:1,two:2,three:3};
var {one,two,three}=nums;  // take one,two,three from object
console.log(one,two,three);   
//1 2 3
var {two,one,three}=nums;   // can swap position
console.log(one,two,three);
//1 2 3
*/
//===================
/*
//classes,getters
class thing{
    constructor(_id){
        this._id=_id;
    }
    get id(){    //default function "get" to call property
        return this._id
    }
    idx(){
        return this._id //typical how to write function
    }
}

var t = new thing(555);
console.log(t.id)   //when use no need to put t.id()
console.log(t.idx())  //this is call normal function
*/
//==================

//generators
function* range(start,end){
    while(start<end){
        yield start;  //mean yield = return but it will not exit loop while keep continue
        start += 1;
    }
}

for (let i of range(0,10)){
    console.log(i);
}
