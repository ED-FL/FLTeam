import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchTagService } from "./service/searchTagService";
import ISearchTree from '../../ISearchTree';

export class editTagAction implements ISearchTreeAction {
    
    constructor(private tagId: number, private newTagName: string) { }

    visit(): Promise<ISearchTree> {
        let searchService = new searchTagService(exampleObject);
        return searchService.updateTag(this.tagId, this.newTagName);
    }
}