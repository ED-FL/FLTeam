angular.module("app")
.directive('ngRightClick', ["$parse", function($parse) {
    return {
    	restrict: 'A',
    	controller: function () {},
    	link: function($scope,element,attrs) {

			element.bind('contextmenu', function(event) {
				$scope.$apply(function() {
                    event.preventDefault();
					if(attrs.ngRightClick !== undefined){
                        var fn = $parse(attrs.ngRightClick);                      
						fn($scope, {$event:event});
					}
  	            });
  		    });
    	}
    }
}]);