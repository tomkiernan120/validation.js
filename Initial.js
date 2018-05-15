/*
 *  Project: jQuery Validation plugin
 *  Author: Tom Kiernan
 *  License: Unlicense
 */

;
(function ($, window, document, undefined) {

  var pluginName = "validate",
    dataKey = "plugin_" + pluginName;

  var Plugin = function (element, options) {

    this.element = element;

    this.options = {
      spanClass: 'custom-validation-error',
      errorClass: 'custom-validation-input-error',
      attribute: 'custom-validate',
      auto: true,
    };

    this.init(options);
  };

  Plugin.prototype = {
    init: function (options) {
      var _self = this;
      $.extend(this.options, options);

      this.element.bind("blur", function (e) {
        _self.validate.call(this, _self);
      });
    },

    validate: function (_self) {

      var $this = $(this);


      var $attr = $this.attr(_self.options.attribute);
      var validationobject;
      var error = false;
      if ($attr.length) {
        validationobject = JSON.parse($this.attr(_self.options.attribute));
      }

      if ($this.hasClass(_self.options.errorClass)) {
        $this.removeClass(_self.options.errorClass);
      }

      if ($this.next("." + _self.options.spanClass)) {
        $this.next("." + _self.options.spanClass).remove();
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
          
          var regex = new RegExp(validationobject.regex);

          if( window.console ) {
            console.log(regex);
          }
          
          if (!(regex.test($this.val().trim()))) {
            error = true;
          }
        }
        

        // age limit..


      }

      // try and test what type of input it is if nothing is set
      if ($this && !error && _self.options.auto) {

        var type = $this.attr( "type" );

        
      }

      if (error) {

        if (typeof validationobject.message !== 'undefined' && validationobject.message.length) {
          $this.parent().append("<span class=\"" + _self.options.spanClass + "\">" + validationobject.message + "</span>");
          $this.addClass(_self.options.errorClass);
        } else {
          $this.parent().append("<span class=\"" + _self.options.spanClass + "\">There was an error with this field</span>");
          $this.addClass(_self.options.errorClass);
        }

      }

      return $this;
    },

    color: function (color) {
      this.options.color = color;
      this.element.css('color', color);
    },

    background: function (color) {
      this.options.background = color;
      this.element.css('background-color', color);
    }
  };

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

}(jQuery, window, document));

// ;(function ($, window, undefined){
//   $.fn.validate = function( options ){

//     var settings = $.extend({
//       spanClass: 'custom-validation-error',
//       errorClass: 'custom-validation-input-error',
//       attribute: 'custom-validate',
//     });

//     return this.each( function(){
//       var $this = $(this);
//       $this.call(  )
//     });


//   };
// }(jQuery, window));
