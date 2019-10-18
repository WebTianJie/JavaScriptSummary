define(function(require,exports,moudle){
	var msg="m1";
	function foo(){
		console.log(msg);
	}
	moudle.exports={
		foo:foo
	}
})