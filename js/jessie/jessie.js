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

	var attachWindowListener;

	if(global && isHostMethod(global, 'addEventListener')) {
		attachWindowListener = function(eventType, fn) {
			// Remove this line on deployment -- for debugging only 
			if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) { 
				throw new Error('Use attachListener with an element.'); 
			} 

			var listener = function(e) {
				fn.call(e, e);
			};

			global.addEventListener(eventType, listener, false);

			return listener;
		};
	};

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


	var getElement;

	if (isHostMethod(document, 'getElementById')) { 
	  getElement = function(id) { 
	    return document.getElementById(id); 
	  }; 
	};

	var getElementPositionStyles;

	if( html 
		&& getElement
		&& isHostObjectProperty(html, 'style') 
		&& 'number' == typeof html.offsetLeft 
		&& 'string' == typeof html.style.left ) {

		getElementPositionStyles =  getElementPositionStyles = (function() {
			var result, 
				sides = ['left', 'top', 'right', 'bottom'], 
				inlineStyles = {},
				findPosition;

			findPosition = function(el, sides) {
				var i, 
					offsetLeft, 
					offsetTop;

				offsetLeft = el.offsetLeft;
				offsetTop = el.offsetTop;
				el.style[sides[2]] = 'auto';
				el.style[sides[3]] = 'auto';

				if (offsetLeft != el.offsetLeft) {
					result[sides[0]] = null;
				}

				if (offsetTop != el.offsetTop) {
					result[sides[1]] = null;
				}

				offsetLeft = el.offsetLeft;
				offsetTop = el.offsetTop;

				el.style[sides[0]] = offsetLeft + 'px';
				el.style[sides[1]] = offsetTop + 'px';

				if (result[sides[0]] !== null && el.offsetLeft != offsetLeft) {
					if (sides[0] == 'left') {
						result[sides[0]] = offsetLeft - el.offsetLeft + offsetLeft;
					} 
					else {
						result[sides[0]] = el.offsetLeft;
					}
				}

				if (result[sides[1]] !== null && el.offsetTop != offsetTop) {
					if (sides[1] == 'top') {
						result[sides[1]] = offsetTop - el.offsetTop + offsetTop;
					} 
					else {
						result[sides[1]] = el.offsetTop;
					}
				}

				for (i = 4; i--;) {
					el.style[sides[i]] = inlineStyles[sides[i]];
				}
			};

			return function(el) {
				var i, 
					side, 
					otherSide;

				result = {};

				for (i = 2; i--;) {
					side = sides[i];
					otherSide = sides[i + 2];
					result[side] = result[otherSide] = el['offset' + side.charAt(0).toUpperCase() + side.substring(1)];
				}

				for (i = 4; i--;) {
					side = sides[i];
					inlineStyles[side] = el.style[side];
				}

				findPosition(el, sides);
				findPosition(el, sides.slice(2).concat(sides.slice(0, 2)));

				return result;
			};

		})();
	};

	var addClass;

	if (html && "string" == typeof html.className ) {
	    addClass = function(el, className) {
	      var re;
	      if (!el.className) {
	        el.className = className;
	      }
	      else {
	        re = new RegExp('(^|\\s)' + className + '(\\s|$)');
	        if (!re.test(el.className)) { el.className += ' ' + className; }
	      }
	    };
	};

	var removeClass;
	if(html && "string" == typeof html.className) {
		removeClass = function(el, className) {
			var re, m;
			if (el.className) {
			  if (el.className == className) {
				el.className = '';
			  }
			  else {		
				re = new RegExp('(^|\\s)' + className + '(\\s|$)');
				m = el.className.match(re);
				if (m && m.length == 3) { el.className = el.className.replace(re, (m[1] && m[2])?' ':''); }
			  }
			}
		};
	};
	
	var attachBoundWindowListener;

	if(attachWindowListener && bind) {
		attachBoundWindowListener = function(eventType, fn, thisObject) {
			var listener = bind(fn, thisObject);
			return attachWindowListener(eventType, listener);
		};
	};

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
	
	var getEventTarget;

	if(html && isHostMethod(html, 'addEventListener')) {
		getEventTarget = function(e) { 
		  var target = e.target; 
		  // Check if not an element (e.g. a text node) 
		  if (1 != target.nodeType) { 
			// Set reference to parent node (which must be an element) 
			target = target.parentNode; 
		  } 
		  return target; 
		};
	}
	
	var delegateListener;

	if(attachListener && getEventTarget) {
		delegateListener = function(el, eventType, fn, fnDelegate) {

			var listener = function(e) {			
				if(fnDelegate(getEventTarget(e))) {
					fn.call(e, e);
				}
			};

			return attachListener(el, eventType, listener);

		};
	};
	
	var delegateBoundListener;

	if(delegateListener && bind) {
		delegateBoundListener = function(el, eventType, fn, fnDelegate, thisObject) {
			var listener = bind(function(e) {
				if(fnDelegate(getEventTarget(e))) {
					fn.call(thisObject, e);
				}
			}, thisObject);

			attachListener(el, eventType, listener);
			return listener;		
		};
	};

	if(html && isHostMethod(html, 'addEventListener')) {
		var cancelDefault = function(e) { 
			e.preventDefault();
		};
	}

	var createXhr;

	if(isHostMethod(global, "XMLHttpRequest")) {
		try {
			if(new global.XMLHttpRequest()) {
				createXhr = function() {
					return new XMLHttpRequest();
				};
			}
		}
		catch(e) {}
	}

	var createXhrFunctions = [
			function() {
	          return new global.ActiveXObject("Microsoft.XMLHTTP");
	        },
	        // for fully patched Win2k SP4 and up
	        function() {
	          return new global.ActiveXObject("Msxml2.XMLHTTP.3.0");
	        },
	        // IE 6 users that have updated their msxml dll files.
	        function() {
	          return new global.ActiveXObject("Msxml2.XMLHTTP.6.0");
	        }
		],
		i;

	for (i=createXhrFunctions.length; i--; ) {
		try {
			if (createXhrFunctions[i]()) {
				createXhr = createXhrFunctions[i];
			}
		}
		catch (e) {}
	}


	var getViewportSize;

	if(html && 'number' == typeof html.clientWidth) {
		getViewportSize = function(win) {
			var html = win.document.documentElement;
			return [html.clientWidth, html.clientHeight];
		}
	};


	globalDocument = html = null;

	global.jessie = {};
	global.jessie.attachBoundListener = attachBoundListener;
	global.jessie.attachWindowListener = attachWindowListener;
	global.jessie.bind = bind;
	global.jessie.getElementPositionStyles = getElementPositionStyles;
	global.jessie.addClass = addClass;
	global.jessie.removeClass = removeClass;
	global.jessie.getViewportSize = getViewportSize;
	global.jessie.attachBoundWindowListener = attachBoundWindowListener;
	global.jessie.attachListener = attachListener;
	global.jessie.delegateListener = delegateListener;
	global.jessie.delegateBoundListener = delegateBoundListener;
	global.jessie.getEventTarget = getEventTarget;
	global.jessie.cancelDefault = cancelDefault;
	global.jessie.createXhr = createXhr;
})(this);