var grid;

function init() {
	"use strict";
	
	var result = document.getElementById('result');

	var slider = new Slider('slider', {
		width: 200,
		height: 20,
		onchange: function() {
			result.innerHTML = this.value;
		}
	});

}

window.onload = init;