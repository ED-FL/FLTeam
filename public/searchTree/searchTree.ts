angular.module('app').component('searchTree', {
    templateUrl: './searchTree.html',
    bindings: {
        tree: '=',
        handleAction: "&"
    },
    controller: function() {}
})