import ISearchTree from "../../../ISearchTree";
import { actionFolderTypes } from "./actionFolderTypes";
import { editFolderAction } from "../editFolderAction";
import { deleteFolderAction } from "../deleteFolderAction";
import { addNewFolderAction } from "../addNewFolderAction";
import { addNewTagFolderAction } from "../addNewTagFolderAction";
import { duplicateFolderAction } from "../duplicateFolderAction";

export class searchFolderService {
    
    private isFolderFound : boolean = false;

    constructor(private actionType : actionFolderTypes) {}

    public executeAction(id, tree ,newfolderName?) : Promise<ISearchTree>  {
        return new Promise((resolve, reject) => {
            
            this.updateTree(id, tree ,newfolderName)
          
            if(this.isFolderFound) {
                resolve(tree);
            }
            else {
                reject('error- item not found')
            }       
        });
    }

    private updateTree(id, tree ,newFolderName?, currentFolders?, index?) {
        if(tree.folderId === id) {         
            this.isFolderFound = true;
            switch (this.actionType) {
                case actionFolderTypes.Edit:
                    editFolderAction.editFolder(tree, newFolderName);
                    break;
                case actionFolderTypes.Delete:
                    deleteFolderAction.deleteFolder(currentFolders, index);
                    break;
                case actionFolderTypes.AddFolder:
                    addNewFolderAction.addNewFolder(tree, newFolderName, id);
                    break;
                    case actionFolderTypes.AddTag:
                    addNewTagFolderAction.addNewTag(tree, newFolderName, id);
                    break;
                case actionFolderTypes.Duplicte:
                    duplicateFolderAction.duplicteFolder(currentFolders, index);
                    break;
                default:
                    console.log('actionType no match: ', this.actionType);
                    break;
                }
            }

        if(!this.isFolderFound) {
            tree.folders.forEach((folder, index, currentFolders) => {
                this.updateTree(id, folder ,newFolderName, currentFolders, index);        
            });       
        }
    }
}