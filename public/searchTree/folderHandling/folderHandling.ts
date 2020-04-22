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
    controller: function($mdDialog) {

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

        $ctrl.showDeleteConfirm = (event, folder) => {            
            var confirm = $mdDialog.confirm()
                  .title('?האם אתה בטוח שברצונך למחוק את התיקייה')
                  .textContent('כל התיקיות והתגים בתוך תיקייה זו ימחקו לצמיתות')
                  .ok('מחק')
                  .cancel('ביטול');
        
            $mdDialog.show(confirm).then(() => {
                onFolderDeleted(folder);              
            }, () => {
            });
        };

        $ctrl.showRemoveSharingConfirm = (event, folder) => {            
            var confirm = $mdDialog.confirm()
                  .title('?האם אתה בטוח שברצונך להסיר שיתוף תיקייה ')
                  .textContent('כל התיקיות והתגים בתוך תיקייה זו לא יהיו נגישים יותר')
                  .ok('הסר שיתוף')
                  .cancel('ביטול');
        
            $mdDialog.show(confirm).then(() => {
                onRemoveSharing(folder);              
            }, function() {
            });
        };

        const onFolderDeleted = (folder): void => {                        
            this.handleAction(new deleteFolderAction(folder.folderId));
        };   
        
        const onRemoveSharing = (folder) => {
            this.handleAction(new removeSharingFolderAction(folder.folderId));
        }

        $ctrl.onFolderEdited = (folder): void => {
            this.handleAction(new editFolderAction(folder.folderId));
        }

        $ctrl.onFolderShared = (folder): void => {
            this.handleAction(new shareFolderAction(folder.folderId));
        }

        $ctrl.onFolderDuplicated = (folder): void => {
            this.handleAction(new duplicateFolderAction(folder.folderId));
        }

        $ctrl.onSharedInfo = (folder) => {
            this.handleAction(new sharingInfoFolderAction(folder.folderId))
        }
    }
})