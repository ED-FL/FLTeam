angular.module('app')
.component('tagsHandling', {
    templateUrl: './tagsHandling.html',
    bindings: {
        data : '='
    },
    controller: function() {

        var $ctrl = this;

        $ctrl.onItemClicked = function(data) {
            console.log('go to tag link: ', data);  
        };
    }
})
