(function(){
	require.config({
		paths:{
			m2:'./moudles/m2',
			m1:'./moudles/m1'
		}
	})
	require(['m2'],function(m2){
		m2.show();
	})
})()
