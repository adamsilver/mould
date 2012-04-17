mould.StreamEnhancer;

if(	mould.ModeChanger && 
	jessie.delegateBoundListener && 
	jessie.attachBoundListener &&
	jessie.cancelDefault) {

	mould.StreamEnhancer = function(navigation, display) {
		this.navigation = navigation;
		this.display = display;
		mould.ModeChanger.apply(this, arguments);
		jessie.delegateBoundListener(navigation, "click", this.handleNavigation_onClick, function(target) {
			if(target.tagName.toLowerCase() == "a") {
				return true;
			}
			if(target.parentNode.tagName.toLowerCase() == "a") {
				return true;
			}
			if(target.parentNode.parentNode.tagName.toLowerCase() == "a") {
				return true;
			}
		}, this);
		
		this.createBackButton();
	};
	
	mould.StreamEnhancer.prototype = mould.ModeChanger.prototype;
	
	mould.StreamEnhancer.prototype.handleNavigation_onClick = function(e) {
		jessie.cancelDefault(e);
		this.display.innerHTML = "";
		if(this.compactMode) {
			this.showDisplay();
			this.hideNavigation();
			this.showBackButton();
		}
		this.requestStream();
	};
	
	mould.StreamEnhancer.prototype.createBackButton = function() {
		this.backButton = document.createElement("a");
		this.backButton.innerHTML = "Back to streams";
		this.backButton.href = "#";
		jessie.attachBoundListener(this.backButton, "click", this.handleBackButton_onClick, this);
	};
	
	mould.StreamEnhancer.prototype.handleBackButton_onClick = function(e) {
		jessie.cancelDefault(e);
		this.hideDisplay();
		this.showNavigation();
	};
	
	mould.StreamEnhancer.prototype.showBackButton = function() {
		this.display.appendChild(this.backButton);
	};
	
	mould.StreamEnhancer.prototype.hideBackButton = function() {
		if(this.backButton && this.backButton.parentNode) {
			this.display.removeChild(this.backButton);
		}
	};
	
	mould.StreamEnhancer.prototype.hideNavigation = function() {
		this.navigation.style.display = "none";
	};
	
	mould.StreamEnhancer.prototype.showNavigation = function() {
		this.navigation.style.display = "block";
	};
	
	mould.StreamEnhancer.prototype.requestStream = function() {
		//alert("request stream");
		this.requestStream_onSuccess();
	};
	
	mould.StreamEnhancer.prototype.requestStream_onSuccess = function(response) {
		//alert("show stream in display area");
		var p = document.createElement("p");
		p.innerHTML = "i have been updated";
		this.display.appendChild(p);
	};

	mould.StreamEnhancer.prototype.enableCompactMode = function() {	
		if(this.compactMode) {
			return;
		}
		this.hideDisplay();		
		this.compactMode = true;
	};
	
	mould.StreamEnhancer.prototype.hideDisplay = function() {
		this.display.style.display = "none";
	};
	
	mould.StreamEnhancer.prototype.showDisplay = function() {
		this.display.style.display = "block";
	};	
	
	mould.StreamEnhancer.prototype.disableCompactMode = function() {
		this.showDisplay();		
		this.hideBackButton();
		this.showNavigation();
		this.compactMode = false;
	};
}