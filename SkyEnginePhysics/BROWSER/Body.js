/*
 * 바디 노드
 * 
 * 물리 바디를 월드에 등록하는 등의 처리를 수행합니다.
 */
SkyEnginePhysics.Body = CLASS({
	
	init : (inner, self, params) => {
		
		let world;
		
		let appendTo;
		OVERRIDE(self.appendTo, (origin) => {
			
			appendTo = self.appendTo = (node) => {
				//REQUIRED: node
				
				if (node.checkIsInstanceOf(SkyEnginePhysics.World) === true) {
					world = node;
					world.addBody(self.getBody());
				}
				
				origin(node);
			};
		});
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				if (world !== undefined) {
					world.removeBody(self.getBody());
				}
				
				origin();
			};
		});
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			self.step = step = (deltaTime) => {
				
				let position = self.getBody().position;
				
				self.setPosition({
					x : position.x,
					y : position.y
				});
				
				self.setAngle(self.getBody().angle / Math.PI * 180);
				
				origin(deltaTime);
			};
		});
	}
});
