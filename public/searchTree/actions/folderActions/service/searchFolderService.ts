import ISearchTree from "../../../ISearchTree";
import { actionFolderTypes } from "./actionFolderTypes";
import { SearchTree } from "../../../searchTreePerent/SearchTreeImplement";

export class searchFolderService {
    
    private isfolderFound : boolean = false;

    constructor(private tree : ISearchTree) {}

    public executeAction(id, tree, actionType ,newfolderName?) : Promise<ISearchTree>  {
        return new Promise((resolve, reject) => {
            
            if(id === tree.folderId && tree.isMainTree) {
                this.mainTreeHandler(id ,tree, actionType ,newfolderName);
                return;
            }

            this.updateTree(id, tree, actionType ,newfolderName)
          
            if(this.isfolderFound) {
                resolve(this.tree);
            }
            else {
                reject('error- item not found')
            }       
        });
    }

    private updateTree(id, tree, actionType ,newfolderName?) {
        tree.folders.forEach((folder, index, currentFolder) => {
            if(folder.folderId === id) {         
                this.isfolderFound = true;
                switch (actionType) {
                    case actionFolderTypes.Edit:
                        folder.folderName = newfolderName;      
                        break;
                    case actionFolderTypes.Delete:
                        currentFolder.splice(index, 1);
                        break;
                    case actionFolderTypes.Add:
                        folder.folders.push(new SearchTree(`adeed-1${index}`, newfolderName, 'owner', id, [], [], true, false, false));   
                        break;
                    default:
                        console.log('actionType no match: ', actionType);
                        break;
                    }
                }

            if(!this.isfolderFound) {
                this.updateTree(id, folder, actionType ,newfolderName);        
            }
        });
    }
    
    private mainTreeHandler(id, tree, actionType ,newfolderName?) {
        this.isfolderFound = true;
        tree.folders.push(new SearchTree(`adeed-1${Math.random()}`, newfolderName, 'owner', id, [], [], true, false, false))            
        return;
    }
}