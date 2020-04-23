import ISearchTree from "../../../ISearchTree";

export class searchTagService {
    
    private isTagFound : boolean;

    constructor(private tree : ISearchTree) {}

    public actionOnTag(id, newTagName) : Promise<ISearchTree> {
        return new Promise((resolve, reject) => {
            this.findTagById(id, newTagName, this.tree);
            if(this.isTagFound) {
                // update - server ?                       
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }
        });
    }
    
    public deleteTag(id) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.findTagById(id, undefined, this.tree);
            if(this.isTagFound) {
                // delete - server ?          
                resolve(this.tree);  
            }
            else {
                reject('error- item not found')
            }
        });
    }

    private findTagById(id, newTagName?, tree?) {
        tree.tags.forEach((tag, index) => {
            if(tag.tagId === id) {
                
                this.isTagFound = true;

                if (newTagName) {
                    tag.tagName = newTagName;
                }
                else {  
                    this.tree.tags.splice(index, 1);
                }
            }
        });
    
        tree.folders.forEach(folder => {
            this.findTagById(id, newTagName, folder);        
        });
    
    }
}