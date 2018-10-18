SkyEnginePhysicsSample.Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let world = SkyEnginePhysics.World().appendTo(SkyEngine.Screen);
		
		let rect = SkyEnginePhysics.Rect({
			y : -200,
			width : 80,
			height : 80,
			angle : 30,
			color : '#ff0000'
		}).appendTo(world);
		
		let circle = SkyEnginePhysics.Circle({
			x : 50,
			y : -100,
			width : 80,
			height : 150,
			angle : 35,
			color : '#00ff00'
		}).appendTo(world);
		
		let ground = SkyEnginePhysics.Rect({
			y : 210,
			width : 810,
			height : 60,
			isStatic : true,
			color : '#0000ff'
		}).appendTo(world);
		
		inner.on('close', () => {
			world.remove();
		});
	}
});
