import ISearchTree from "../../../ISearchTree";
import { typesActionTag } from "./typesActionTag";

export class searchTagService {
    
    private isTagFound : boolean;

    constructor(private tree : ISearchTree) {}

    public executeAction(id, tree, actionType ,newTagName?) : Promise<ISearchTree>  {
        return new Promise((resolve, reject) => {
            this.updateTree(id, tree, actionType ,newTagName)
          
            if(this.isTagFound) {
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }       
        });
    }

    private updateTree(id, tree, actionType ,newTagName?) {
        tree.tags.forEach((tag, index, currentTags) => {
            if(tag.tagId === id) {         
                this.isTagFound = true;
                switch (actionType) {
                    case typesActionTag.Edit:
                        tag.tagName = newTagName;      
                        break;
                    case typesActionTag.Delete:
                        currentTags.splice(index, 1);
                        break;
                    default:
                        console.log('actionType no match: ', actionType);
                        break;
                    }
                }

            if(!this.isTagFound) {
                tree.folders.forEach(folder => {
                    this.updateTree(id, folder, actionType, newTagName);        
                });            
            }
        });
    }
}