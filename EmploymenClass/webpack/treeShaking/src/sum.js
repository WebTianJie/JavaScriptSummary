import lodash from 'lodash-es'

var  aa=function(){
console.log('aa');
}
var isArray=function(arg){
	console.log(lodash.isArray(arg));
}
export {
	aa,
	isArray
}
