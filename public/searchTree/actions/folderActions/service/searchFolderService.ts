import ISearchTree from "../../../ISearchTree";
import { actionFolderTypes } from "./actionFolderTypes";
import { SearchTree } from "../../../searchTreePerent/SearchTreeImplement";

export class searchFolderService {
    
    private isfolderFound : boolean = false;

    constructor(private actionType : actionFolderTypes) {}

    public executeAction(id, tree ,newfolderName?) : Promise<ISearchTree>  {
        return new Promise((resolve, reject) => {

            this.updateTree(id, tree ,newfolderName)
          
            if(this.isfolderFound) {
                resolve(tree);
            }
            else {
                reject('error- item not found')
            }       
        });
    }

    private updateTree(id, tree ,newfolderName?, arrayFolders?, index?) {
        if(tree.folderId === id) {         
            this.isfolderFound = true;
            switch (this.actionType) {
                case actionFolderTypes.Edit:
                    this.editFolderFolder(tree ,newfolderName);
                    break;
                case actionFolderTypes.Delete:
                    this.deleteFolder(arrayFolders, index);
                    break;
                case actionFolderTypes.Add:
                    this.addNewFolder(tree ,newfolderName, id);
                    break;
                default:
                    console.log('actionType no match: ', this.actionType);
                    break;
                }
            }
        tree.folders.forEach((folder, index, arrayFolders) => {
            if(!this.isfolderFound) {
                this.updateTree(id, folder ,newfolderName, arrayFolders, index);        
            }
        });   
    }

    private editFolderFolder(tree ,newfolderName) {
        tree.folderName = newfolderName;      
    }

    private deleteFolder(arrayFolders, index) {
        arrayFolders.splice(index, 1);
    }

    private addNewFolder(tree ,newfolderName, perentId) {
        tree.folders.push(new SearchTree(`adeed-1${Math.random()}`, newfolderName, 'owner', perentId, [], [], true, false, false));   
    }
}