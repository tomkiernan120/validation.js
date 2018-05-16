/*
 *  Project: jQuery Validation plugin
 *  Author: Tom Kiernan
 *  License: Unlicense
 */

;
((($, window, document, undefined) => {
	const pluginName = "validate";
	const dataKey = `plugin_${pluginName}`;

	class Plugin {
		constructor(element, options) {

			this.element = element;

			this.options = {
				spanClass: 'custom-validation-error',
				errorClass: 'custom-validation-input-error',
				attribute: 'custom-validate',
				auto: true,
			};

			this.init(options);
		}

		init(options) {
			const _self = this;
			$.extend(this.options, options);

			this.element.bind("blur", function (e) {
				_self.validate.call(this, _self);
			});
		}

		validate(_self) {

			const $this = $(this);


			const $attr = $this.attr(_self.options.attribute);
			let validationobject;
			let error = false;
			if ($attr.length) {
				validationobject = JSON.parse($this.attr(_self.options.attribute));
			}

			if ($this.hasClass(_self.options.errorClass)) {
				$this.removeClass(_self.options.errorClass);
			}

			if ($this.next(`.${_self.options.spanClass}`)) {
				$this.next(`.${_self.options.spanClass}`).remove();
			}

			if (typeof validationobject === 'object' && typeof validationobject !== 'undefined') {

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

					const regex = new RegExp(validationobject.regex);

					if (window.console) {
						console.log(regex);
					}

					if (!(regex.test($this.val().trim()))) {
						error = true;
					}
				}


				// credit cards American Express (Amex), Discover, MasterCard, and Visa 
				if (validationobject.creditcard) {

					if (!(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/.test($this.val()))) {
						error = true;
					}
				}

				// test for IP address
				if (validationobject.ipaddress) {
					if (!(/^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/.test($this.val()))) {
						error = true;
					}
				}

				// test of URL
				if (validationobject.url) {
					if (!(/^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/.test($this.val()))) {
						error = true;
					}
				}

				// test uk postcodes
				if (validationobject.ukpostcode) {
					if (!(/^([A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2})*$/.test($this.val()))) {
						error = false;
					}
				}

				// test us postcode
				if (validationobject.uspostcode) {
					if (!(/^([0-9]{5}(?:-[0-9]{4})?)*$/.test($this.val()))) {
						error = false;
					}
				}

				// age limit..


			}

			// try and test what type of input it is if nothing is set
			if ($this && !error && _self.options.auto) {

				const type = $this.attr("type");


			}

			if (error) {

				if (typeof validationobject.message !== 'undefined' && validationobject.message.length) {
					$this.parent().append(`<span class="${_self.options.spanClass}">${validationobject.message}</span>`);
					$this.addClass(_self.options.errorClass);
				} else {
					$this.parent().append(`<span class="${_self.options.spanClass}">There was an error with this field</span>`);
					$this.addClass(_self.options.errorClass);
				}

			}

			return $this;
		}

		color(color) {
			this.options.color = color;
			this.element.css('color', color);
		}

		background(color) {
			this.options.background = color;
			this.element.css('background-color', color);
		}
	}

	/*
	 * Plugin wrapper, preventing against multiple instantiations and
	 * return plugin instance.
	 */
	$.fn[pluginName] = function (options) {

		let plugin = this.data(dataKey);

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
})(jQuery, window, document));