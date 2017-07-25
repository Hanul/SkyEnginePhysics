SkyEnginePhysics.Node = CLASS(() => {
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
	
		init : (inner, self, params) => {
			
			OVERRIDE(self.draw, (origin) => {
				
				self.draw = draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
					
					
					
					origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
				};
			});
		}
	};
});
