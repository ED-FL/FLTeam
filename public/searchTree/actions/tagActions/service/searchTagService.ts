import ISearchTree from "../../../ISearchTree";
import { typesActionTag } from "./typesActionTag";
import { NewTag } from "../../../searchTreePerent/SearchTreeImplement";
import { editTagAction } from "../editTagAction";
import { deleteFolderAction } from "../../folderActions/deleteFolderAction";
import { deleteTagAction } from "../deleteTagAction";
import { duplicteTagAction } from "../dupicateTagAction";

export class searchTagService {
    
    private isTagFound : boolean;

    constructor(private actionType : typesActionTag) {}

    public executeAction(id: string, tree: ISearchTree ,newTagName?: string) : Promise<ISearchTree>  {
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

    private updateTree(id: string, tree: ISearchTree ,newTagName?: string): void {
        tree.tags.forEach((tag, index, currentTags) => {
            if(tag.tagId === id) {         
                this.isTagFound = true;
                switch (this.actionType) {
                    case typesActionTag.Edit:
                        editTagAction.editTag(newTagName, currentTags, index);
                        break;
                    case typesActionTag.Delete:
                        deleteTagAction.deleteTag(currentTags, index);
                        break;
                    case typesActionTag.Duplicte:
                        duplicteTagAction.duplicteTag(currentTags, index);
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
}