mould.Ribbon = function(ribbonContainer, headerContainer) {
	this.showingRibbon = true;
	this.ribbonContainer = ribbonContainer;
	this.headerContainer = headerContainer;
	this.createButton();
	this.hideRibbon();	
};
mould.Ribbon.prototype.createButton = function() {
	this.button = document.createElement("a");
	this.button.className = "ribbonButton";
	this.button.innerHTML = "Show Ribbon";
	this.button.href="#";
	this.button.addEventListener("click", this.handleButton_onClick.bind(this), false);
	this.headerContainer.appendChild(this.button);
};
mould.Ribbon.prototype.showRibbon = function() {
	this.ribbonContainer.style.display = "block";
	this.showingRibbon = true;
	this.button.innerHTML = "Hide Ribbon";
};
mould.Ribbon.prototype.hideRibbon = function() {
	this.ribbonContainer.style.display = "none";
	this.showingRibbon = false;
	this.button.innerHTML = "Show Ribbon";
};
mould.Ribbon.prototype.handleButton_onClick = function(e) {
	if(this.showingRibbon) {
		this.hideRibbon();
	}
	else {
		this.showRibbon();
	}	
};