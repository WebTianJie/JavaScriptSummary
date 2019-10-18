import './index.css'
import $ from 'jquery'
//var json=require('../data.json')
//console.log(json);
$.ajax({
	url:'http://localhost:9090/data.json',
	success:function(data){
		console.log(data);
	}
})
console.log('测试热更新');
if(module.hot){
	module.hot.accept();
}
