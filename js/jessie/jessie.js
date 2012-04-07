(function(global) {
	
	var globalDocument = global.document,
		html,
		canCall = !!Function.prototype.call;

	
	function isHostMethod(object, method) {
		var type = typeof object[method];
		return	type == 'function' || 
				type == 'object' && !!object[method] || 
				type == 'unknown';
	};

	function isHostObjectProperty(object, property) {
		return !!(typeof(object[property]) == 'object' && object[property]);
	};

	if(isHostObjectProperty(globalDocument, 'documentElement')) {
		html = globalDocument.documentElement;
	}

	var bind;

	if(Function.prototype.bind){
	    bind = function(fn, thisObject) {
	        return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
	    };
	}

	var bind;

	if(canCall) {
	  bind = function(fn, context) {
	    var prependArgs = Array.prototype.slice.call(arguments, 2);

	    if (prependArgs.length) {
	      return function() {
	        fn.apply(context, Array.prototype.concat.apply(prependArgs, arguments));
	      };
	    }
	    return function() {
	      fn.apply(context, arguments);
	    };
	  };
	}

	var attachListener;

	if(html && isHostMethod(html, 'addEventListener')) {
		attachListener = function(el, eventType, fn) { 

			var listener = function(e) {
				fn.call(e, e);
			};

			el.addEventListener(eventType, listener, false); 

			return listener;
		};
	};

	var attachBoundListener;

	if(bind && attachListener) {
		attachBoundListener = function(el, eventType, fn, thisObject) {
			var listener = bind(fn, thisObject);

			thisObject = null;

			return attachListener(el, eventType, listener);
		};
	};

	globalDocument = html = null;

	global.jessie = {};
	global.jessie.attachBoundListener = attachBoundListener;

})(this);