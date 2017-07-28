SkyEnginePhysicsSample.Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let physicsNode = SkyEnginePhysics.Node({
			
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', () => {
			physicsNode.remove();
		});
	}
});
