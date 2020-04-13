angular.module('app').component('searchTree', {
    templateUrl: './searchTree.html',
    bindings: {
        tree: '=' 
    },
    controller: function() {
         this.logObject = () => {
            console.log(this.tree);
         }
    }
})







