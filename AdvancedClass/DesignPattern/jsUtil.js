var jsUtil = {
	// 普通构造函数,转化成单利模式构造函数
	getSingle: function(func) {
		var result;
		return function() {
			if (!result) {
				result = func.apply(this, arguments);
			}
			return result;
		}
	}
}
