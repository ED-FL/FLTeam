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

            this.recurciveFunction(id, tree, actionType ,newfolderName)
          
            if(this.isfolderFound) {
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }       
        });
    }

    private recurciveFunction(id, tree, actionType ,newfolderName?) {
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
                this.recurciveFunction(id, folder, actionType ,newfolderName);        
            }
        });
    }
    
    private mainTreeHandler(id, tree, actionType ,newfolderName?) {
        this.isfolderFound = true;
        tree.folders.push(new SearchTree(`adeed-1${Math.random()}`, newfolderName, 'owner', id, [], [], true, false, false))            
        return;
    }
}

// public executeAction(id, tree, actionType ,newfolderName?) : Promise<ISearchTree>  {
//     return new Promise((resolve, reject) => {
//         //handel main tree
//         if(id === tree.folderId && tree.isMainTree) {
//             this.isfolderFound = true;
//             tree.folders.push(new SearchTree(`adeed-1${Math.random()}`, newfolderName, 'owner', id, [], [], true, false, false))            
//             return;
//         }

//         tree.folders.forEach((folder, index, currentFolder) => {
//             if(folder.folderId === id) {
                
//                 this.isfolderFound = true;

//                 switch (actionType) {
//                     case actionFolderTypes.Edit:
//                         folder.folderName = newfolderName;      
//                         break;
//                     case actionFolderTypes.Delete:
//                         currentFolder.splice(index, 1);
//                         break;
//                     case actionFolderTypes.Add:
//                         folder.folders.push(new SearchTree(`adeed-1${index}`, newfolderName, 'owner', id, [], [], true, false, false));   
//                         break;
//                     default:
//                         console.log('actionType no match: ', actionType);
//                         break;
//                     }

//                 if (actionType === actionFolderTypes.Edit) {
//                     folder.folderName = newfolderName;
//                 }
//                 else if(actionType === actionFolderTypes.Delete) {  
//                     currentFolder.splice(index, 1);
//                 }
//                 else if(actionType === actionFolderTypes.Add) {
//                     folder.folders.push(new SearchTree(`adeed-1${index}`, newfolderName, 'owner', id, [], [], true, false, false));
//                 }
//             }

//             if(!this.isfolderFound) {
//                 this.executeAction(id, folder, actionType ,newfolderName);        
//             }

//             if(this.isfolderFound) {
//                 resolve(this.tree);  
//             }
//             else {
//                 reject('error- item not found')
//             }
//         });
//     });
// }
