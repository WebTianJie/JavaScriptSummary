let fs=require('fs');
function readFile(path){
	return new Promise((res,rej)=>{
		fs.readFile(path,'utf-8',(err,data)=>{
			if(data){
				res(data);
			}else{
				rej(err);
			}
		})
	})
}
// readFile('./data/name.txt').then((data)=>{
// 	return readFile(data);
// },(data)=>{
// 	
// }).then((data)=>{
// 	return readFile(data);
// },(data)=>{
// 	
// }).then((data)=>{
// 	console.log(data);
// });

function *read(){
	let val1=yield readFile('./data/name.txt');
	let val2=yield readFile(val1);
	let val3=yield readFile(val2);
	return val3;
}

let og=read();
// let {value,done} =og.next();
// value.then((val)=>{
// 	let {value,done} =og.next(val);
// 	value.then((val)=>{
// 		let {value,done} =og.next(val);
// 		value.then((val)=>{
// 			console.log(val);
// 		})
// 	})
// })

//递归优化
function Co(oit){
	return new Promise((res,rej)=>{
		let next=(data)=>{
			let {value,done}=oit.next(data);
			if(done){
				res(value);
			}else{
				value.then((val)=>{
					next(val);
				})
			}
		}
		next();
	});
}
Co(read()).then((val)=>{
	console.log(65,val);
})
//引入Co插件命令行
// npm init
// npm install Co
Co(read()).then((val)=>{
	console.log(65,val);
})