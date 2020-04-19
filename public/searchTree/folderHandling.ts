angular.module('app')
.component('folderHandling', {
    templateUrl: './folderHandling.html',
    bindings: {
        tree : '='
    },
    controller: function() {

        var $ctrl = this;

        $ctrl.onFolderClicked = (folder): void => {
            
            folder.folders.forEach(folder => {
                folder.collapsed = !folder.collapsed;
            });

            folder.tags.forEach(tag => {
                tag.collapsed = !tag.collapsed;
            });
        };    
    }
})