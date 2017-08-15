/*
 * 원형 노드
 */
SkyEnginePhysics.Circle = CLASS({
	
	preset : () => {
		return SkyEngine.Circle;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.width
		//REQUIRED: params.height
		//OPTIONAL: params.isStatic
			
		let width = params.width;
		let height = params.height;
		let isStatic = params.isStatic;
		
		let radius;
		
		if (width > height) {
			radius = width;
		} else {
			radius = height;
		}
		
		let body = Matter.Bodies.circle(self.getX(), self.getY(), radius / 2, {
			isStatic : isStatic
		});
		
		if (width > height) {
			Matter.Body.scale(body, 1, height / width);
		} else {
			Matter.Body.scale(body, width / height, 1);
		}
		
		if (self.getAngle() !== 0) {
			Matter.Body.rotate(body, self.getAngle() * Math.PI / 180);
		}
		
		let getBody = self.getBody = () => {
			return body;
		};
		
		SkyEnginePhysics.Body.innerInit(inner, self, params);
		
		if (CONFIG.SkyEngine.isDebugMode === true) {
			
			let draw;
			OVERRIDE(self.draw, (origin) => {
				
				self.draw = draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
					
				    context.beginPath();
					
					context.ellipse(0, 0, width / 2, height / 2, 0, 0, 2 * Math.PI);
					
					origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
				};
			});
		}
	}
});
