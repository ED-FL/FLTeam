import * as angular from "angular";
import { deleteFolderAction } from "../actions/deleteFolderAction";

angular.module('app')
.component('folderHandling', {
    templateUrl: './folderHandling.html',
    bindings: {
        tree : '=',
        handleAction: "="
    },
    controller: function() {

        var $ctrl = this;

        $ctrl.onFolderClicked = (folder): void => {
           // this.onFolderDeleted(folder);
            
            folder.folders.forEach(folder => {
                folder.collapsed = !folder.collapsed;
            });

            folder.tags.forEach(tag => {
                tag.collapsed = !tag.collapsed;
            });
        };    

        $ctrl.onFolderDeleted = (folder): void => {                        
            this.handleAction(new deleteFolderAction(folder.folderId));
        };   

        $ctrl.openMenu = function($mdMenu, ev, currentFolder) {        
            console.log($mdMenu, ev, currentFolder);            
            $mdMenu.open(ev);
        };
    }
})