import * as angular from "angular";
import { deleteFolderAction } from "../actions/deleteFolderAction";
import ISearchTree from "../ISearchTree";

angular.module('app')
.component('folderHandling', {
    templateUrl: './folderHandling.html',
    bindings: {
        tree : '=',
        handleAction: "="
    },
    controller: function() {

        var $ctrl = this;

        $ctrl.onFolderClicked = (folder : ISearchTree): void => {
           // this.onFolderDeleted(folder);
            
            folder.folders.forEach(folder => {
                folder.collapsed = !folder.collapsed;
            });

            folder.tags.forEach(tag => {
                tag.collapsed = !tag.collapsed;
            });
        };    

        $ctrl.openMenu = ($mdMenu, event, currentFolder): void => {        
            $mdMenu.open(event);
        };

        $ctrl.onFolderDeleted = (folder): void => {                        
            this.handleAction(new deleteFolderAction(folder.folderId));
        };   
    }
})