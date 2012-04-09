mould.pages.catalogue = (function() {

	if(mould.Ribbon) {
		this.ribbon = new mould.Ribbon(document.getElementById("ribbon"), document.getElementById("headerInner"));
	}

	if(mould.Navigation) {
		this.navigation = new mould.Navigation(document.getElementById("navigation"), document.getElementById("headerInner"));
	}
	
})();