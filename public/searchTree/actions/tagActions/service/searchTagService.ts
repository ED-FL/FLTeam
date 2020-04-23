import { INewTag } from "../../../INewTag";
import { SearchTree } from "../../../searchTreePerent/SearchTreeImplement";

export class searchTagService {
    
    public foundTag : INewTag;

    public getUpdatedTag(tree: SearchTree, id, newTagName) : Promise<INewTag> {
        return new Promise((resolve, reject) => {
            this.findTagById(tree, id);
            if(this.foundTag) {
                this.foundTag.tagName = newTagName;            
                resolve(this.foundTag);  
            }
            else {
                reject('error- item not found')
            }
        });
    }
    
    private findTagById(tree: SearchTree, id) {
        tree.tags.forEach(tag => {
            if(tag.tagId === id) {
                this.foundTag = tag;
            }
        });
    
        tree.folders.forEach(folder => {
            this.findTagById(folder, id);        
        });
    }
}