import ISearchTree from "../../../ISearchTree";
import { ISearchTreeAction } from "../../ISearchTreeAction";
import { SearchTree } from "../../../searchTreePerent/SearchTreeImplement";

export class searchFolderService {
    
    private isfolderFound : boolean;

    constructor(private tree : ISearchTree) {}

    public updateFolder(id, newfolderName) : Promise<ISearchTree> {
        return new Promise((resolve, reject) => {
            this.findFolderById(id, this.tree, newfolderName);
            if(this.isfolderFound) {
                // update - server ?                       
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }
        });
    }
    
    public deleteFolder(id) : Promise<ISearchTree> {
        return new Promise((resolve, reject) => {
            this.findFolderById(id, this.tree);
            if(this.isfolderFound) {
                // delete - server ?          
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }
        });
    }

    
    public addNewFolder(id, newfolderName): Promise<ISearchTree> {
        return new Promise((resolve, reject) => {
            this.findFolderById_add(id, this.tree, newfolderName);
            if(this.isfolderFound) {
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }
        });
    }
    
    private findFolderById_add(id, tree, newfolderName) {
        tree.folders.forEach((folder, index, currentFolder) => {
            if(folder.folderId === id) {
                
                this.isfolderFound = true;
                currentFolder.push(new SearchTree(`adeed-1${index}`, newfolderName, 'owner', id, [], [], false, false, false));
            }
            this.findFolderById_add(id, folder, newfolderName);        
        });
    }
    
    private findFolderById(id, tree, newfolderName?) {

        tree.folders.forEach((folder, index, currentFolder) => {
            if(folder.folderId === id) {
                
                this.isfolderFound = true;

                if (newfolderName) {
                    folder.folderName = newfolderName;
                }
                else {  
                    currentFolder.splice(index, 1);
                }
            }
            this.findFolderById(id, folder, newfolderName);        
        });
    }
}