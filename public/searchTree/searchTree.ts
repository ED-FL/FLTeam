angular.module('app').component('searchTree', {
    templateUrl: './searchTree.html',
    bindings: {
        tree: '=' 
    },
    controller: function() {

         this.onItemClicked = function(data) {
            if(data.tagId) {
                console.log('tag');       
                return;
            }
            data.folders.forEach(item => {
                item.collapsed = !item.collapsed;
            });

            data.tags.forEach(item => {
                item.collapsed = !item.collapsed;
            });
        };
    }
})







