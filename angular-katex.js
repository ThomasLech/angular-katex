/*!
 * angular-katex v0.2.1
 * https://github.com/tfoxy/angular-katex
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */

(function() {
  'use strict';

  angular.module('katex', [])
      .constant('katex', katex)
      .provider('katexConfig', ['katex', function(katex) {
        var self = this;

        self.errorTemplate = function(err) {
          return '<span class="katex-error">' + err + '</span>';
        };
        self.errorHandler = function(err, text, element) {
          element.html(self.errorTemplate(err, text));
        };

        self.render = function(element, text) {
          try {
            katex.render(text || '', element[0]);
          } catch (err) {
            self.errorHandler(err, text, element);
          }
        };

        //noinspection JSUnusedGlobalSymbols
        this.$get = function() {
          return this;
        };
      }])
      .directive('katex', ['katexConfig', function(katexConfig) {
        return {
          restrict: 'AE',
          compile: function(element, attrs) {
            katexConfig.render(element, attrs.katex || element.html());
          }
        };
      }])
      .directive('katexBind', ['katexConfig', function(katexConfig) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            var model = attrs.katexBind;

            scope.$watch(model, function(text) {
              katexConfig.render(element, text);
            });
          }
        };
      }]);
})();
