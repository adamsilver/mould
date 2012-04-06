mould.Ribbon = function(ribbonContainer, headerContainer) {
	this.showingRibbon = true;
	this.ribbonContainer = ribbonContainer;
	this.headerContainer = headerContainer;
	this.createButton();
	this.hideRibbon();	
};
mould.Ribbon.prototype.createButton = function() {
	var a = document.createElement("a");
	a.className = "ribbonButton";
	a.innerHTML = "Show Ribbon";
	a.href="#";
	a.addEventListener("click", this.handleButton_onClick.bind(this), false);
	this.headerContainer.appendChild(a);
};
mould.Ribbon.prototype.showRibbon = function() {
	this.ribbonContainer.style.display = "block";
	this.showingRibbon = true;
};
mould.Ribbon.prototype.hideRibbon = function() {
	this.ribbonContainer.style.display = "none";
	this.showingRibbon = false;
};
mould.Ribbon.prototype.handleButton_onClick = function(e) {
	if(this.showingRibbon) {
		this.hideRibbon();
	}
	else {
		this.showRibbon();
	}	
};