if(jessie.attachBoundListener) {
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
		this.button.innerHTML = "<span>Show Ribbon</span>";
		this.button.href="#";
		this.text = this.button.childNodes[0];
		jessie.attachBoundListener(this.button, "click", this.handleButton_onClick, this);
		this.headerContainer.appendChild(this.button);
	};
	mould.Ribbon.prototype.showRibbon = function() {
		this.ribbonContainer.style.display = "block";
		this.showingRibbon = true;
		this.text.innerHTML = "Hide Ribbon";
	};
	mould.Ribbon.prototype.hideRibbon = function() {
		this.ribbonContainer.style.display = "none";
		this.showingRibbon = false;
		this.text.innerHTML = "Show Ribbon";
	};
	mould.Ribbon.prototype.handleButton_onClick = function(e) {
		e.preventDefault();
		if(this.showingRibbon) {
			this.hideRibbon();
		}
		else {
			this.showRibbon();
		}
	};
}