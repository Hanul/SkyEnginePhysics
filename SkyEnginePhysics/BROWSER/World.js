/*
 * 월드 노드
 */
SkyEnginePhysics.World = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self) => {
		
		let engine = Matter.Engine.create();
		
		let addBody = self.addBody = (body) => {
			Matter.World.add(engine.world, body);
		};
		
		let removeBody = self.removeBody = (body) => {
			Matter.World.remove(engine.world, body);
		};
		
		let beforeDeltaTime;
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				Matter.Engine.update(engine, deltaTime * 1000, deltaTime / beforeDeltaTime);
				
				beforeDeltaTime = deltaTime;
				
				origin(deltaTime);
			};
		});
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				Matter.Engine.clear(engine);
				
				origin();
			};
		});
	}
});
