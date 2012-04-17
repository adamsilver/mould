mould.pages.streams = (function() {
	
	if(mould.Ribbon) {
		this.ribbon = new mould.Ribbon(document.getElementById("ribbon"), document.getElementById("headerInner"));
	}
	
	if(mould.StreamEnhancer) {
		this.streamEnhancer = new mould.StreamEnhancer(document.getElementById("streamNavigation"), document.getElementById("streamDisplay"));
	}
	
})();