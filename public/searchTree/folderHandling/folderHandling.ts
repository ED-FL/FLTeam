import * as angular from "angular";
import ISearchTree from "../ISearchTree";
import { editFolderAction } from "../actions/folderActions/editFolderAction";
import { deleteFolderAction } from "../actions/folderActions/deleteFolderAction";
import { shareFolderAction } from "../actions/folderActions/shareFolderAction";
import { duplicateFolderAction } from "../actions/folderActions/duplicateFolderAction";
import { removeSharingFolderAction } from "../actions/folderActions/removeSharingFolderAction";
import { sharingInfoFolderAction } from "../actions/folderActions/sharingInfoFolderAction";
import { addNewFolderAction } from "../actions/folderActions/addNewFolderAction";
import { removeAllLayersFolderAction } from "../actions/folderActions/removeAllLayersFolderAction";
import { addNewTagFolderAction } from "../actions/folderActions/addNewTagFolderAction";

angular.module('app')
.component('folderHandling', {
    templateUrl: './folderHandling.html',
    bindings: {
        tree : '=',
        handleAction: "="
    },
    controller: function($mdDialog) {

        var $ctrl = this;

        $ctrl.onFolderClicked = (tree: ISearchTree): void => {

            tree.folders.forEach(folder => {
                folder.collapsed = !folder.collapsed;  
            });

            tree.tags.forEach(tag => {
                tag.collapsed = !tag.collapsed;
            });
        };    

        $ctrl.openMenu = ($mdMenu, event): void => {     
            $mdMenu.open(event);
        };

        $ctrl.showDeleteConfirm = (event, folder: ISearchTree): void => {            
            var confirm = $mdDialog.confirm()
                  .title('?האם אתה בטוח שברצונך למחוק את התיקייה')
                  .textContent('כל התיקיות והתגים בתוך תיקייה זו ימחקו לצמיתות')
                  .ok('מחק')
                  .cancel('ביטול');
        
            $mdDialog.show(confirm).then(() => {
                onFolderDeleted(folder);              
            }, () => {});
        };

        $ctrl.showRemoveSharingConfirm = (event, folder: ISearchTree): void => {            
            var confirm = $mdDialog.confirm()
                  .title('?האם אתה בטוח שברצונך להסיר שיתוף תיקייה ')
                  .textContent(' התיקיות והתגיות בתיקייה זו לא יהיו נגישים יותר')
                  .ok('הסר שיתוף')
                  .cancel('ביטול');
        
            $mdDialog.show(confirm).then(() => {
                onRemoveSharing(folder);              
            }, () => {});
        };

        $ctrl.showAddingFolderDialog = (ev, folder: ISearchTree): void => {
            var confirm = $mdDialog.prompt()
              .title('הכנס שם תיקייה')
              .placeholder('שם תיקייה')
              .required(true)
              .ok('צור תיקייה')
              .cancel('בטל');
        
            $mdDialog.show(confirm).then((result) => {
                onAddingFolder(folder, result);
            }, () => {});
        };

        $ctrl.showAddingTagDialog = (ev, folder: ISearchTree): void => {
            var confirm = $mdDialog.prompt()
              .title('הכנס שם תגית')
              .placeholder('שם תגית')
              .required(true)
              .ok('צור תגית')
              .cancel('בטל');
        
            $mdDialog.show(confirm).then((result) => {
                onAddingTag(folder, result);
            }, () => {});
        };

        $ctrl.showEditFolderDialog = (ev, folder: ISearchTree): void => {
            var confirm = $mdDialog.prompt()
              .title('הכנס שם חדש')
              .placeholder('שם תיקייה')
              .required(true)
              .ok('עדכן שם')
              .cancel('בטל');
        
            $mdDialog.show(confirm).then((result) => {
                onFolderEdited(folder, result);
            }, () => {});
        };


        const onFolderDeleted = (folder: ISearchTree): void => {                        
            $ctrl.handleAction(new deleteFolderAction(folder.folderId));
        };   
        
        const onRemoveSharing = (folder: ISearchTree): void => {
            $ctrl.handleAction(new removeSharingFolderAction(folder.folderId));
        }

        const onAddingFolder = (folder: ISearchTree, newFolderName: string): void => {
            $ctrl.handleAction(new addNewFolderAction(folder.folderId, newFolderName));
        }

        const onFolderEdited = (folder: ISearchTree, newFolderName: string): void => {
            $ctrl.handleAction(new editFolderAction(folder.folderId, newFolderName));
        }

        const onAddingTag = (folder: ISearchTree, newTagName: string): void => {
            $ctrl.handleAction(new addNewTagFolderAction(folder.folderId, newTagName))
        }

        $ctrl.onFolderShared = (folder: ISearchTree): void => {
            $ctrl.handleAction(new shareFolderAction(folder.folderId));
        }

        $ctrl.onFolderDuplicated = (folder: ISearchTree): void => {
            $ctrl.handleAction(new duplicateFolderAction(folder.folderId));
        }

        $ctrl.onSharedInfo = (folder: ISearchTree): void => {
            $ctrl.handleAction(new sharingInfoFolderAction(folder.folderId))
        }

        $ctrl.removeAllLayers = (folder: ISearchTree): void => {
            $ctrl.handleAction(new removeAllLayersFolderAction(folder.folderId))
        }
    }
})