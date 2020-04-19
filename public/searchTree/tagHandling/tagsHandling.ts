angular.module('app')
.component('tagsHandling', {
    templateUrl: './tagsHandling.html',
    bindings: {
        tree : '='
    },
    controller: function() {

        var $ctrl = this;

        $ctrl.onTagClicked = (tag): void => {
            console.log('go to tag link: ', tag);  
        };
    }
})
