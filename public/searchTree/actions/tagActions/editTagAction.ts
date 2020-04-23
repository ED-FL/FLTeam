import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObjectAfterAction, SearchTree, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { INewTag } from '../../INewTag';

export class editTagAction implements ISearchTreeAction {
    
    private foundTag : INewTag;

    constructor(private tagId: number, private newTagName: string) { }

    visit(): Promise<{}> {
        return this.getUpdatedTag(exampleObjectAfterAction, this.tagId);
    }

    private getUpdatedTag(tree, id) {

        return new Promise((resolve, reject) => {
            this.findTagById(tree, id);
            if(this.foundTag) {
                this.foundTag.tagName = this.newTagName;            
                resolve(this.foundTag);  
            }
            else {
                reject('error-------')
            }
        });
    }

    private findTagById(tree : SearchTree, id) {
        tree.tags.forEach(tag => {
            if(tag.tagId === id) {
                this.foundTag = tag;
                console.log('on loop: ', this.foundTag);
                console.log('finish loop');
                return;
            }
        });
    
        tree.folders.forEach(folder => {
            this.findTagById(folder, id);        
        });
    }
}