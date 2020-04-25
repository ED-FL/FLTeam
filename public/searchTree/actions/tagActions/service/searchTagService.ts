import ISearchTree from "../../../ISearchTree";
import { typesActionTag } from "./typesActionTag";
import { NewTag } from "../../../searchTreePerent/SearchTreeImplement";

export class searchTagService {
    
    private isTagFound : boolean;

    constructor(private actionType : typesActionTag) {}

    public executeAction(id, tree ,newTagName?) : Promise<ISearchTree>  {
        return new Promise((resolve, reject) => {
            this.updateTree(id, tree ,newTagName)
          
            if(this.isTagFound) {
                resolve(tree);  
            }
            else {
                reject('error- item not found')
            }       
        });
    }

    private updateTree(id, tree ,newTagName?) {
        tree.tags.forEach((tag, index, currentTags) => {
            if(tag.tagId === id) {         
                this.isTagFound = true;
                switch (this.actionType) {
                    case typesActionTag.Edit:
                        this.editTag(newTagName, currentTags, index);
                        break;
                    case typesActionTag.Delete:
                        this.deleteTag(currentTags, index);
                        break;
                    case typesActionTag.Duplicte:
                        this.duplicteTag(currentTags, index);
                        break;
                    default:
                        console.log('actionType no match: ', this.actionType);
                        break;
                    }
                }
        });

        if(!this.isTagFound) {
            tree.folders.forEach(folder => {
                this.updateTree(id, folder, newTagName);        
            });            
        }
    }

    private editTag(newTagName, currentTags, index) {
        currentTags[index].tagName = newTagName;
    }

    private deleteTag(arrayTags, index) {
        arrayTags.splice(index, 1);
    }

    private duplicteTag(currentTags, index) {

        let duplictedTag = new NewTag(
            Math.floor(Math.random()*100).toString(),
            currentTags[index].tagName,
            currentTags[index].queryId,
            currentTags[index].extraInfo,
            currentTags[index].type,
            currentTags[index].parentFolderId,
            currentTags[index].collapsed,
            currentTags[index].isRule,
            currentTags[index].isRuleStopped,
            currentTags[index].hasKml,
            currentTags[index].isSharedTag
        )
        
        currentTags.push(duplictedTag);
    }
}