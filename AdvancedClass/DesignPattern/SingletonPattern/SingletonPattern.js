var getSingle = function(func) {
	var result;
	return function() {
		if (!result) {
			result = func.apply(this, arguments);
		}
		return result;
	}
}
