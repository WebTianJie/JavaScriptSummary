function filterArrByText(data,filterText){
	
	if(!filterText){
		return data;
	}else{
		return data.filter(function(ele,index,self){
			return ele['name'].indexOf(filterText)>-1;
		});
	}
}