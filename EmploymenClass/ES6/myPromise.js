function MyPromise(executor){
	this.status="pending";
	var self=this;
	self.resolveValue=null;
	self.rejectReason=null;
	self.ResolveCallBackList=[];
	self.RejectedCallBackList=[];
	function resolve(val){
		if(self.status=="pending"){
			self.status="Fulfiled";	
			self.resolveValue=val;
			self.ResolveCallBackList.forEach((ele)=>{
				ele();
			})
		}
		
	}
	function reject(reason){
		if(self.status=="pending"){
			self.status="Rejected";	
			self.rejectReason=reason;
			self.RejectedCallBackList.forEach((ele)=>{
				ele();
			})
		}
	}
	try{
		executor(resolve,reject);
	}catch(e){
		reject(e);
	}
	
}
function ResoluteReturnPromise(nextPromise,returnValue,res,rej){
	if(returnValue instanceof MyPromise){
		//返回值是Promise对象
		returnValue.then((val)=>{
			res(val);
		},(reason)=>{
			rej(reason);
		})
	}else{
		res(returnValue);
	}
	
}
MyPromise.prototype.then=function(onFulfiled,onRejected){
	var self=this;
	if(!onFulfiled){
		onFulfiled=function(val){
			return val;
		}
	}
	if(!onRejected){
		onRejected=function(reason){
			throw new Error(reason);
		}
	}
		
		
	var  nextPromise=new MyPromise((res,rej)=>{
		if(self.status=="Fulfiled"){
			setTimeout(()=>{
				try{
					var nextResolveValue=onFulfiled(self.resolveValue);
					ResoluteReturnPromise(nextPromise,nextResolveValue,res,rej);
				}catch(e){
					rej(e);
				}
			},0)
		}
		if(self.status=="Rejected"){
			setTimeout(()=>{
				try{
					var nextRejectValue=onRejected(self.rejectReason);
					ResoluteReturnPromise(nextPromise,nextRejectValue,res,rej);
				}catch(e){
					//TODO handle the exception
					console.log(e);
					rej(e);
				}
			},0)
			
		}
		if(self.status=="pending"){
			self.ResolveCallBackList.push(function(){
				setTimeout(()=>{
					try{
						var nextResolveValue=onFulfiled(self.resolveValue);
						ResoluteReturnPromise(nextPromise,nextResolveValue,res,rej);
					}catch(e){
						//TODO handle the exception
						rej(e);
					}
				},0)
			})
			self.RejectedCallBackList.push(function(){
				setTimeout(()=>{
					try{
						var nextRejectValue=onRejected(self.rejectReason);
						ResoluteReturnPromise(nextPromise,nextRejectValue,res,rej);
					}catch(e){
						//TODO handle the exception
						rej(e);
					}
				},0)
			})
		}
	})
	return nextPromise;
}
