angular.module("app")
.directive('ngRightClick', ["$parse", ($parse) => {
    return {
    	restrict: 'A',
    	link: ($scope, element, attrs) => {

			element.bind('contextmenu', (event) => {                
				$scope.$apply(() => {
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