import * as angular from "angular";
import { editFolderAction } from "../actions/folderActions/editFolderAction";
import { deleteFolderAction } from "../actions/folderActions/deleteFolderAction";
import { shareFolderAction } from "../actions/folderActions/shareFolderAction";
import { duplicateFolderAction } from "../actions/folderActions/duplicateFolderAction";
import { removeSharingFolderAction } from "../actions/folderActions/removeSharingFolderAction";
import { sharingInfoFolderAction } from "../actions/folderActions/sharingInfoFolderAction";
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

            folder.folders.forEach(folder => {
                folder.collapsed = !folder.collapsed;
            });

            folder.tags.forEach(tag => {
                tag.collapsed = !tag.collapsed;
            });
        };    

        $ctrl.openMenu = ($mdMenu, event): void => {                    
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
            this.handleAction(new sharingInfoFolderAction(folder.folderId))
        }

        $ctrl.onRemoveSharing = (folder) => {
            this.handleAction(new removeSharingFolderAction(folder.folderId));
        }
    }
})