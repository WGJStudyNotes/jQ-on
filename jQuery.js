function JQuery(arg){
	this.elements = [];
	switch(typeof arg){//arg: function, object, string
		case 'function': //文档就绪函数
			window.addEventListener('load', arg, false);
			break;
		case 'object':
			this.elements.push(arg);
			break;
		case 'string': //arg: #aa, .aa, aa
			var prefix = arg.charAt(0);
			switch(prefix){
				case '#': //id
					var domObj = document.getElementById(arg.substring(1));
					if(domObj){
						this.elements.push(domObj);
					}
					break;
				case '.': //class
					this.elements = document.getElementsByClassName(arg.substring(1));
					break;
				default://tag
					this.elements = document.getElementsByTagName(arg);
					break;

			}
			break;
	}
}
JQuery.prototype.on = function(type, selector, fn){
	if(typeof selector == 'string'){
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].addEventListener(type, function(e){
				var prefix = selector.charAt(0);
				switch(prefix){
					case '#'://id
						if(e.target.id == selector.substring(1)){
							fn.call(e.target);
						}
						break;
					case '.'://class
						if(e.target.className == selector.substring(1)){
							fn.call(e.target);
						}
						break;
					default://tag
						break;
				}
			}, false);
		}
	}else{
		for(var i=0; i<this.elements.length; i++){
			fn = selector;
			this.elements[i].addEventListener(type, fn, false);
		}
	}
	return this;
};
JQuery.prototype.click = function(fn){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].addEventListener('click', fn, false);
	}
	return this;
};
JQuery.prototype.mouseover = function(fn){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].addEventListener('mouseover', fn, false);
	}
	return this;
};
JQuery.portotype.css=function(elem,value){
	if (value) {
		for (var i = 0; i <this.elements.length; i++) {
			setCss(this.elements[i],elem,value);
				}
		}
	}else{
		if (typeof elem=="string") {
			return getStyle(arr[0],elem);
		}else{
			for(var p in elem){
				for (var i = 0; i < this.elements.length; i++) {
					setCss(this.elements,elem,value);
				}
			}
		}
	}
function $(arg){
	return new JQuery(arg);
}
function getStyle(elem,attr){
	if (elem.currentStyle) {
		return elem.currentStyle[attr];
	}
	else{
		return getComputedStyle(elem,false)[attr];
	}
 };
 function setCss(elem,attr,value){
 	switch(attr){
 		case 'width':
 		case 'height':
 		case 'padding':
 		case 'paddingLeft':
 		case 'paddingTop':
 		case 'paddingBottom':
 		case 'paddingRight':
 			value=/\%/.test(value):value?Math.max(paserInt(value))+'px';
 			break;
 		case 'left':
 		case 'top':
 		case 'bottom':
 		case 'right':
 		case 'margin':
 		case 'marginTop':
 		case 'marginLeft':
 		case 'marginButtom':
 		value=/\%/.test(value):value?paserInt(value)+'px';
 		break;
 	}
 	elem.style[attr]=value;
 }