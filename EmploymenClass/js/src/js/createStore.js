function createStore(initialState){
	var state=initialState||{};
	var list=[];
	function getState(type){
		return state[type];
	}
	function dispatch(action){
		state[action['type']]=action.value;
		list.forEach(function(ele,index,self){
			ele();
		})
	}
	function subscribe(fn){
		list.push(fn)
	}
	return {
		getState:getState,
		subscribe:subscribe,
		dispatch:dispatch
	}
}
var  store=createStore({
	text:'',
	sex:'all'
});