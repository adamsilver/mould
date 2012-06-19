if(jessie.attachBoundWindowListener) {
	mould.ModeChanger = function() {
		jessie.attachBoundWindowListener("resize", this.window_onResize, this);
		this.checkMode();
	};

	mould.ModeChanger.prototype.window_onResize = function(e){
		this.checkMode();
	};
		
	mould.ModeChanger.prototype.checkMode = function() {
		var width = document.documentElement.clientWidth;
		if(width <= 480) {
			this.enableCompactMode();
		}
		else {
			this.disableCompactMode();
		}
	};
};