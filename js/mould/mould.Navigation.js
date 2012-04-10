if(jessie.attachWindowListener && 
	jessie.attachBoundListener && 
	jessie.getElementPositionStyles && 
	jessie.addClass && 
	jessie.removeClass) {

	mould.Navigation = function(menuContainer, headerContainer) {
		this.compactModeEnabled = false;
		this.showingMenu = false;
		this.menuContainer = menuContainer;
		this.headerContainer = headerContainer;
		this.windowResizeListener = jessie.bind(this.handleWindow_onResize, this);
		jessie.attachWindowListener("resize", this.windowResizeListener);
		this.createButton();
		this.check();
	};
	mould.Navigation.prototype.createButton = function() {
		this.button = document.createElement("a");
		this.button.className = "navigationButton";
		this.button.href = "#";		
		//this.headerContainer.appendChild(this.button);
		this.headerContainer.insertBefore(this.button, this.headerContainer.childNodes[0]);
		jessie.attachBoundListener(this.button, "click", this.handleButton_onClick, this);
	};
	mould.Navigation.prototype.enableCompactMode = function() {
		if(this.compactModeEnabled == false) {
			this.hideMenu();
			this.showingMenu = false;
			this.compactModeEnabled = true;
		}
	};
	mould.Navigation.prototype.handleButton_onClick = function(e) {
		e.preventDefault();
		// if this button has been clicked we can definitely assume that we are in compact mode
		//var buttonPosition = jessie.getElementPositionStyles(e.target);
		//jessie.setPositionStyles();
		if(this.showingMenu) {
			this.hideMenu();
		}
		else {
			this.showMenu();
		}
	};
	mould.Navigation.prototype.showButton = function() {

	};
	mould.Navigation.prototype.hideButton = function() {

	};
	mould.Navigation.prototype.showMenu = function() {
		//console.log("showMenu");
		jessie.removeClass(this.menuContainer, "hide");
		jessie.addClass(this.button, "activated");
		this.showingMenu = true;
		
	};
	mould.Navigation.prototype.hideMenu = function() {
		//console.log("hideMenu");
		jessie.addClass(this.menuContainer, "hide");
		jessie.removeClass(this.button, "activated");
		this.showingMenu = false;
	};
	mould.Navigation.prototype.disableCompactMode = function() {
		if(this.compactModeEnabled == true) {
			this.hideButton();
			this.showMenu();
			this.compactModeEnabled = false;
		}
	};
	mould.Navigation.prototype.handleWindow_onResize = function(e) {
		this.check();
	};
	mould.Navigation.prototype.check = function() {
		var width = document.documentElement.clientWidth;
		if(width <= 320) {
			this.enableCompactMode();
		}
		else {
			this.disableCompactMode();
		}
	};
};