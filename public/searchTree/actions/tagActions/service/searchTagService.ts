import ISearchTree from "../../../ISearchTree";

export class searchTagService {
    
    private isTagFound : boolean;

    constructor(private tree : ISearchTree) {}

    public updateTag(id, newTagName) : Promise<ISearchTree> {
        return new Promise((resolve, reject) => {
            this.findTagById(id, this.tree, newTagName);
            if(this.isTagFound) {
                // update - server ?                       
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }
        });
    }
    
    public deleteTag(id) : Promise<ISearchTree> {
        return new Promise((resolve, reject) => {
            this.findTagById(id, this.tree);
            if(this.isTagFound) {
                // delete - server ?          
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }
        });
    }

    private findTagById(id, tree, newTagName?) {
        tree.tags.forEach((tag, index, arr) => {
            if(tag.tagId === id) {
                
                this.isTagFound = true;

                if (newTagName) {
                    tag.tagName = newTagName;
                }
                else {  
                    arr.splice(index, 1);
                }
            }
        });
    
        tree.folders.forEach(folder => {
            this.findTagById(id, folder, newTagName);        
        });
    
    }
}