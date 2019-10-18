//根据性别过滤
function filterArrBySex(personArr,sex){
	if(sex=="all"){
		return personArr;
	}else{
		return personArr.filter(function(ele,index,self){
			return ele['sex']==sex;
		});
	}
}