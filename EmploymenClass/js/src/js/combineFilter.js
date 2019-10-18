function combineFilter(config){
	return function(data){
		for(var pop in config){
			data=config[pop](data,store.getState(pop));
		}
		return data;
	}
}
var lastFilterArr=combineFilter({
	text:filterArrByText,
	sex:filterArrBySex
})