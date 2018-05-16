'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *  Project: jQuery Validation plugin
 *  Author: Tom Kiernan
 *  License: Unlicense
 */

;
(function ($, window, document, undefined) {
	var pluginName = "validate";
	var dataKey = 'plugin_' + pluginName;

	var Plugin = function () {
		function Plugin(element, options) {
			_classCallCheck(this, Plugin);

			this.element = element;

			this.options = {
				spanClass: 'custom-validation-error',
				errorClass: 'custom-validation-input-error',
				attribute: 'custom-validate',
				auto: true
			};

			this.init(options);
		}

		_createClass(Plugin, [{
			key: 'init',
			value: function init(options) {
				var _self = this;
				$.extend(this.options, options);

				this.element.bind("blur", function (e) {
					_self.validate.call(this, _self);
				});
			}
		}, {
			key: 'validate',
			value: function validate(_self) {

				var $this = $(this);

				var $attr = $this.attr(_self.options.attribute);
				var validationobject = void 0;
				var error = false;
				if ($attr.length) {
					validationobject = JSON.parse($this.attr(_self.options.attribute));
				}

				if ($this.hasClass(_self.options.errorClass)) {
					$this.removeClass(_self.options.errorClass);
				}

				if ($this.next('.' + _self.options.spanClass)) {
					$this.next('.' + _self.options.spanClass).remove();
				}

				if ((typeof validationobject === 'undefined' ? 'undefined' : _typeof(validationobject)) === 'object' && typeof validationobject !== 'undefined') {

					// strings
					if (typeof validationobject.validate !== 'undefined' && validationobject.validate.toLowerCase() === 'string') {
						if (typeof $this.val().trim() !== 'string') {
							error = true;
						}
					}

					// numbers


					// boolean...

					// min length
					if (validationobject.minlength && $this.val().trim().length < parseInt(validationobject.minlength)) {
						error = true;
					}

					// maxlength 
					if (validationobject.maxlength && $this.val().trim().length > parseInt(validationobject.maxlength)) {
						error = true;
					}

					// regex ...
					if (validationobject.regex && validationobject.regex.length) {

						// console.log();
						// var regexdecode = $('<textarea />').html(validationobject.regex).text();

						var regex = new RegExp(validationobject.regex);

						if (window.console) {
							console.log(regex);
						}

						if (!regex.test($this.val().trim())) {
							error = true;
						}
					}

					// credit cards American Express (Amex), Discover, MasterCard, and Visa 
					if (validationobject.creditcard) {

						if (!/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/.test($this.val())) {
							error = true;
						}
					}

					// test for IP address
					if (validationobject.ipaddress) {
						if (!/^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/.test($this.val())) {
							error = true;
						}
					}

					// test of URL
					if (validationobject.url) {
						if (!/^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/.test($this.val())) {
							error = true;
						}
					}

					// test uk postcodes
					if (validationobject.ukpostcode) {
						if (!/^([A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2})*$/.test($this.val())) {
							error = false;
						}
					}

					// test us postcode
					if (validationobject.uspostcode) {
						if (!/^([0-9]{5}(?:-[0-9]{4})?)*$/.test($this.val())) {
							error = false;
						}
					}

					// age limit..

				}

				// try and test what type of input it is if nothing is set
				if ($this && !error && _self.options.auto) {

					var type = $this.attr("type");
				}

				if (error) {

					if (typeof validationobject.message !== 'undefined' && validationobject.message.length) {
						$this.parent().append('<span class="' + _self.options.spanClass + '">' + validationobject.message + '</span>');
						$this.addClass(_self.options.errorClass);
					} else {
						$this.parent().append('<span class="' + _self.options.spanClass + '">There was an error with this field</span>');
						$this.addClass(_self.options.errorClass);
					}
				}

				return $this;
			}
		}, {
			key: 'color',
			value: function color(_color) {
				this.options.color = _color;
				this.element.css('color', _color);
			}
		}, {
			key: 'background',
			value: function background(color) {
				this.options.background = color;
				this.element.css('background-color', color);
			}
		}]);

		return Plugin;
	}();

	/*
  * Plugin wrapper, preventing against multiple instantiations and
  * return plugin instance.
  */


	$.fn[pluginName] = function (options) {

		var plugin = this.data(dataKey);

		// has plugin instantiated ?
		if (plugin instanceof Plugin) {
			// if have options arguments, call plugin.init() again
			if (typeof options !== 'undefined') {
				plugin.init(options);
			}
		} else {
			plugin = new Plugin(this, options);
			this.data(dataKey, plugin);
		}

		return plugin;
	};
})(jQuery, window, document);
//# sourceMappingURL=babel.validation.js.map