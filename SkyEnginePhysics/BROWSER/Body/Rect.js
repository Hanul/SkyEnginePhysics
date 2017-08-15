/*
 * 사각형 노드
 */
SkyEnginePhysics.Rect = CLASS({
	
	preset : () => {
		return SkyEngine.Rect;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.isStatic
		
		let isStatic = params.isStatic;
		
		let body = Matter.Bodies.rectangle(self.getX(), self.getY(), self.getWidth() * self.getScaleX(), self.getHeight() * self.getScaleY(), {
			isStatic : isStatic,
			angle : self.getAngle() * Math.PI / 180
		});
		
		let getBody = self.getBody = () => {
			return body;
		};
		
		SkyEnginePhysics.Body.innerInit(inner, self, params);
		
		if (CONFIG.SkyEngine.isDebugMode === true) {
			
			let draw;
			OVERRIDE(self.draw, (origin) => {
				
				self.draw = draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
					
				    context.beginPath();
					
					context.rect(-self.getWidth() / 2, -self.getHeight() / 2, self.getWidth(), self.getHeight());
					
					origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
				};
			});
		}
	}
});
