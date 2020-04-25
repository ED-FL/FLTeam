import ISearchTree from "../../../ISearchTree";
import { actionFolderTypes } from "./actionFolderTypes";
import { SearchTree, NewTag } from "../../../searchTreePerent/SearchTreeImplement";

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

    private updateTree(id, tree ,newfolderName?, currentFolders?, index?) {
        if(tree.folderId === id) {         
            this.isfolderFound = true;
            switch (this.actionType) {
                case actionFolderTypes.Edit:
                    this.editFolderFolder(tree ,newfolderName);
                    break;
                case actionFolderTypes.Delete:
                    this.deleteFolder(currentFolders, index);
                    break;
                case actionFolderTypes.Add:
                    this.addNewFolder(tree ,newfolderName, id);
                    break;
                case actionFolderTypes.Duplicte:
                    this.duplicteFolder(currentFolders, index);
                    break;
                default:
                    console.log('actionType no match: ', this.actionType);
                    break;
                }
            }

        if(!this.isfolderFound) {
            tree.folders.forEach((folder, index, currentFolders) => {
                this.updateTree(id, folder ,newfolderName, currentFolders, index);        
            });       
        }
    }

    private editFolderFolder(tree ,newfolderName) {
        tree.folderName = newfolderName;      
    }

    private deleteFolder(arrayFolders, index) {
        arrayFolders.splice(index, 1);
    }

    private addNewFolder(tree ,newfolderName, perentId) {
        let collapsedNewFolder = false;

        if(tree.folders.length > 0) {
            if(tree.folders[0].collapsed) {
                collapsedNewFolder = true;
            }
        }

        if(tree.tags.length > 0 && !collapsedNewFolder) {
            if(tree.tags[0].collapsed) {
                collapsedNewFolder = true;
            }
        }

        tree.folders.push(new SearchTree(`adeed-1${Math.random()}`, newfolderName, 'owner', perentId, [], [], collapsedNewFolder, false, false));   
    }

    private duplicteFolder(currentFolders, index) {

        var duplictedFolder = this.cloneObj(currentFolders[index]);

        duplictedFolder.folderId = Math.floor(Math.random()*100).toString();

        currentFolders.push(duplictedFolder);
    }

    private cloneObj(obj) {
        var copy;
        
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;
    
        // Handle Date
        // if (obj instanceof Date) {
        //     copy = new Date();
        //     copy.setTime(obj.getTime());
        //     return copy;
        // }
    
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneObj(obj[i]);
            }
            return copy;
        }
    
        // Handle Object
        if (obj instanceof Object) {
            if(obj instanceof SearchTree) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObj(obj[attr]);
                }
                let dup = new SearchTree(
                    Math.floor(Math.random()*100).toString(),
                    copy.folderName,
                    copy.owner,
                    copy.parentFolderId,
                    copy.folders,
                    copy.tags,
                    copy.collapsed,
                    copy.isSharedFolder,
                    false,
                );
                return dup;
            }

            if(obj instanceof NewTag) {

                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObj(obj[attr]);
                }

                let dup = new NewTag(
                    Math.floor(Math.random()*100).toString(),
                    copy.tagName,
                    copy.queryId,
                    copy.extraInfo,
                    copy.type,
                    copy.parentFolderId,
                    copy.collapsed,
                    copy.isRule,
                    copy.isRuleStopped,
                    copy.hasKml,
                    copy.isSharedTag);

                return dup;
            }
        }
    
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
}