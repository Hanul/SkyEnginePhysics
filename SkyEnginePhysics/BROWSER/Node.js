SkyEnginePhysics.Node = CLASS(() => {
	
	let engine;
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
	
		init : (inner, self, params) => {
			
			if (engine === undefined) {
				engine = Matter.Engine.create();
			}
			
			// create two boxes and a ground
			var boxA = Matter.Bodies.rectangle(400, -200, 80, 80);
			var boxB = Matter.Bodies.rectangle(450, -100, 80, 80);
			var ground = Matter.Bodies.rectangle(400, 210, 810, 60, { isStatic: true });
			
			// add all of the bodies to the world
			Matter.World.add(engine.world, [boxA, boxB, ground]);
			
			// run the engine
			//Matter.Engine.run(engine);
			
			var bodies = Matter.Composite.allBodies(engine.world);
			
			let beforeDeltaMilliseconds;
			
			let step;
			OVERRIDE(self.step, (origin) => {
				
				step = self.step = (deltaTime) => {
					
					let deltaMilliseconds = deltaTime * 1000;
					
					if (deltaMilliseconds > 30) {
						deltaMilliseconds = 30;
					}
					
					Matter.Engine.update(engine, deltaMilliseconds, deltaMilliseconds / beforeDeltaMilliseconds);
					
					beforeDeltaMilliseconds = deltaMilliseconds;
					
					origin(deltaTime);
				};
			});
			
			let draw;
			OVERRIDE(self.draw, (origin) => {
				
				self.draw = draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
					
					context.fillStyle = '#fff';
					
				    context.beginPath();
				
				    for (var i = 0; i < bodies.length; i += 1) {
				        var vertices = bodies[i].vertices;
				
				        context.moveTo(vertices[0].x, vertices[0].y);
				
				        for (var j = 1; j < vertices.length; j += 1) {
				            context.lineTo(vertices[j].x, vertices[j].y);
				        }
				
				        context.lineTo(vertices[0].x, vertices[0].y);
				    }
				
				    context.lineWidth = 1;
				    context.strokeStyle = '#999';
				    context.stroke();
					
					origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
				};
			});
		}
	};
});
