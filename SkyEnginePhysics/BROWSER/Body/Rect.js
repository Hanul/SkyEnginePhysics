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
			
			self.addToPixiContainer(SkyEngine.Rect.generateGraphics({
				width : params.width,
				height : params.height,
				border : '1px solid #ffff00'
			}));
		}
	}
});
