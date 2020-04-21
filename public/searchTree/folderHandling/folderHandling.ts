import * as angular from "angular";
import { editFolderAction } from "../actions/folderActions/editFolderAction";
import { deleteFolderAction } from "../actions/folderActions/deleteFolderAction";
import { shareFolderAction } from "../actions/folderActions/shareFolderAction";
import { duplicateFolderAction } from "../actions/folderActions/duplicateFolderAction";
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
            console.log(currentFolder);
             
            $mdMenu.open(event);
        };

        $ctrl.onFolderEdited = (folder): void => {
            this.handleAction(new editFolderAction(folder.folderId));
        }
        
        $ctrl.onFolderDeleted = (folder): void => {                        
            this.handleAction(new deleteFolderAction(folder.folderId));
        };   

        $ctrl.onFolderShared = (folder): void => {
            this.handleAction(new shareFolderAction(folder.folderId));
        }

        $ctrl.onFolderDuplicated = (folder): void => {
            this.handleAction(new duplicateFolderAction(folder.folderId));
        }

        $ctrl.onSharedInfo = (folder) => {
            console.log('onSharedInfo', folder);
        }

        $ctrl.onRemoveSharing = (folder) => {
            console.log('onRemoveSharing', folder);
        }
    }
})