
angular.module('travelApp', ['ngAnimate'])

  .config(['$animateProvider', function($animateProvider) {
    $animateProvider.classNameFilter(/animate-/);
  }])

  .directive('animateOnLoad', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.addClass('animate-fade-in');
        
        setTimeout(function() {
          element.addClass('loaded');
        }, 100);
      }
    };
  })

  .service('AnimationService', function() {
    this.staggerDelay = function(index) {
      return (index * 100) + 'ms';
    };
    
    this.addStaggeredAnimation = function(elements) {
      angular.forEach(elements, function(element, index) {
        element.style.animationDelay = (index * 0.1) + 's';
      });
    };
  });