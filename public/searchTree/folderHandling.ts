angular.module('app')
.component('folderHandling', {
    templateUrl: './folderHandling.html',
    bindings: {
        data : '='
    },
    controller: function() {

        var $ctrl = this;

        $ctrl.onItemClicked = function(data) {
            console.log('this: ', this);
            
            console.log(data);

            data.folders.forEach(item => {
                item.collapsed = !item.collapsed;
            });

            data.tags.forEach(item => {
                item.collapsed = !item.collapsed;
            });
        };
        
    }
})