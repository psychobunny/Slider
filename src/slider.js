var Slider;

(function () {
	"use strict";

	/**
	* @param: options: {width, height, onchange}
	*/
	Slider = function (container, options) {
		/*global document*/

		this.container = (container.style) ? container : document.getElementById(container);
		this.handle = document.createElement('div');
		this.body = document.createElement('div');

		this.handle.className = 'slider-handle';
		this.body.className = 'slider-body';

		this.width = options.width;
		this.height = options.height;

		this.body.style.width = options.width + 'px';
		this.body.style.height = (options.height / 2) + 'px';
		this.handle.style.width = this.handle.style.height = this.container.style.height = options.height + 'px';

		this.container.appendChild(this.body);
		this.body.appendChild(this.handle);

		this.origin = 0;

		var mouseup_ev, mousemove_ev, change_ev;

		this.onchange = options.onchange;

		change_ev = function () {
			if (this.onchange) {
				this.value = parseInt(parseInt(this.handle.style.left, 10) / (this.width - this.height) * 100, 10);
				this.onchange();
			}
		}.bind(this);

		mousemove_ev = function (ev) {
			/*global window*/
			ev = (window.event) || ev;

			var position = (ev.clientX - this.origin);

			if (position > (this.width - this.height)) {
				position = (this.width - this.height);
			}

			change_ev();

			this.handle.style.left = (position < 0) ? 0 : position + 'px';
		}.bind(this);

		mouseup_ev = function (ev) {
			if (document.body.addEventListener) {
				document.body.removeEventListener('mousemove', mousemove_ev, true);
				document.body.removeEventListener('mouseup', mouseup_ev, true);
			} else {
				document.body.detachEvent('onmousemove', mousemove_ev);
				document.body.detachEvent('onmouseup', mouseup_ev);
			}
			return false;
		}.bind(this);


		this.body.onmousedown = function (ev) {
			/*global window*/
			ev = (window.event) || ev;

			this.origin = ev.clientX - this.handle.offsetLeft  - this.container.parentNode.offsetLeft;
			if (document.body.addEventListener) {
				document.body.addEventListener('mousemove', mousemove_ev, true);
				document.body.addEventListener('mouseup', mouseup_ev, true);
			} else {
				document.body.attachEvent('onmousemove', mousemove_ev);
				document.body.attachEvent('onmouseup', mouseup_ev);
			}

			return false;
		}.bind(this);
	};
}());