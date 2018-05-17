'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author {Tom Kiernan} {tkiernan120@gmail.com}
 *  Project: jQuery Validation plugin
 *  Author: Tom Kiernan
 *  License: Unlicense
 */

;(function ($, window, document, undefined) {
	var pluginName = "validate";
	var dataKey = 'plugin_' + pluginName;

	/**
  * Main plugin class
  * @class jQuery Plugin
  */

	var Plugin = function () {
		/**
   * 
   * @param {jQuery} element test
   * @param {object} options test
   */
		function Plugin(element, options) {
			_classCallCheck(this, Plugin);

			this.element = element;

			this.options = {
				spanClass: 'custom-validation-error',
				errorClass: 'custom-validation-input-error',
				attribute: 'custom-validate',
				auto: true,
				autoBindBlur: true
			};

			this.regexp = {
				creditcard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/,
				ipaddress: /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/,
				URL: /^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/,
				ukpostcode: /^([A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2})*$/,
				uspostcode: /^([0-9]{5}(?:-[0-9]{4})?)*$/
			};

			this.init(options);
		}

		/**
   * 
   * @param {object} options 
   */


		_createClass(Plugin, [{
			key: 'init',
			value: function init(options) {
				var _self = this;

				$.extend(this.options, options);

				if (this.options.autoBindBlur) {
					this.element.bind("blur", function (e) {
						_self.validate.call(this, _self);
					});
				}
			}
			/**
    * 
    * @param {Plugin} _self 
    */

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

					$this.val($.trim($this.val()));

					// strings
					if (typeof validationobject.validate !== 'undefined' && validationobject.validate.toLowerCase() === 'string') {
						if (window.console) {
							console.log(this);
						}
						if (!_self.string($this.val())) {
							error = true;
						}
					}

					// numbers
					if (typeof validationobject.validate !== 'undefined' && validationobject.validate.toLowerCase() === 'number') {
						if (!_self.number($this.val())) {
							error = true;
						}
					}

					// boolean...
					if (typeof validationobject.validate !== 'undefined' && validationobject.validate.toLowerCase === 'boolean') {
						if (!_self.boolean($this.val())) {
							error = false;
						}
					}

					// min length
					if (validationobject.minlength && !_self.minlength($this.val(), parseInt(validationobject.minlength))) {
						error = true;
					}

					// maxlength 
					if (validationobject.maxlength && !_self.maxlength($this.val(), parseInt(validationobject.maxlength))) {
						error = true;
					}

					// regex ...
					if (validationobject.regex && validationobject.regex.length) {
						if (!_self.testRegex(value, validationobject.regex)) {
							error = false;
						}
					}

					// credit cards American Express (Amex), Discover, MasterCard, and Visa 
					if (validationobject.creditcard && !_self.creditcard($this.val())) {
						error = true;
					}

					// test for IP address
					if (validationobject.ipaddress && !_self.ipaddress($this.val())) {
						error = true;
					}

					// test of URL
					if (validationobject.url && !_self.url($this.val())) {
						error = true;
					}

					// test uk postcodes
					if (validationobject.ukpostcode && !_self.ukpostcode($this.val())) {
						error = true;
					}

					// test us postcode
					if (validationobject.uspostcode && !_self.uspostcode($this.val())) {
						error = true;
					}

					// age limit..
					if (validationobject.age && validationobject.age) {}
				}

				// try and test what type of input it is if nothing is set
				if ($this && !error && _self.options.auto) {

					var type = $this.attr("type");
				}

				if (error) {

					if (typeof validationobject.message !== 'undefined' && validationobject.message.length) {
						$('<span class="' + _self.options.spanClass + '">' + validationobject.message + '</span>').insertAfter($this);
						$this.addClass(_self.options.errorClass);
					} else {
						$('<span class="' + _self.options.spanClass + '">There was an error with this field</span>').insertAfter($this);
						$this.addClass(_self.options.errorClass);
					}
				}

				return $this;
			}

			/**
    * 
    * @param {string} value 
    */

		}, {
			key: 'string',
			value: function string(value) {
				if (typeof value === 'string') {
					return true;
				} else {
					return false;
				}
			}
			/**
    * 
    * @param {number} value 
    */

		}, {
			key: 'number',
			value: function number(value) {
				// TODO: update so that method actually parses strings aswell
				if (typeof value === 'number') {
					return true;
				} else {
					return false;
				}
			}

			/**
    * 
    * @param {boolean} value 
    */

		}, {
			key: 'boolean',
			value: function boolean(value) {
				if (typeof value === 'boolean') {
					return true;
				} else {
					return false;
				}
			}
			/**
    * 
    * @param {string} value 
    * @param {number} minlength 
    */

		}, {
			key: 'minlength',
			value: function minlength(value) {
				var _minlength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				if (value && value.length && value.length >= _minlength) {
					return true;
				} else {
					return false;
				}
			}

			/**
    * @
    * @param {string} value 
    * @param {number} maxlength 
    */

		}, {
			key: 'maxlength',
			value: function maxlength(value) {
				var _maxlength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				if (value && value.length && value.length <= _maxlength) {
					return true;
				} else {
					return false;
				}
			}

			/**
    * 
    * @param {string} value 
    * @param {regexstring} regex 
    */

		}, {
			key: 'testRegex',
			value: function testRegex(value, regex) {
				if (regex.test(value)) {
					return true;
				} else {
					return false;
				}
			}
			/**
    * 
    * @param {string} value 
    */

		}, {
			key: 'creditcard',
			value: function creditcard(value) {
				if (value && this.testRegex(value, this.regexp.creditcard)) {
					return true;
				} else {
					return false;
				}
			}
			/**
    * 
    * @param {string} value 
    */

		}, {
			key: 'ipaddress',
			value: function ipaddress(value) {
				if (value && this.testRegex(value, this.regexp.ipaddress)) {
					return true;
				} else {
					return false;
				}
			}

			/**
    * 
    * @param {string} value 
    */

		}, {
			key: 'url',
			value: function url(value) {
				if (value && this.testRegex(value, this.regexp.URL)) {
					return true;
				} else {
					return false;
				}
			}

			/**
    * 
    * @param {string} value 
    */

		}, {
			key: 'ukpostcode',
			value: function ukpostcode(value) {
				if (value && this.testRegex(value, this.regexp.ukpostcode)) {
					return true;
				} else {
					return false;
				}
			}

			/**
    * 
    * @param {string} value 
    */

		}, {
			key: 'uspostcode',
			value: function uspostcode(value) {
				if (value && this.testRegex(value, this.regexp.uspostcode)) {
					return true;
				} else {
					return false;
				}
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
