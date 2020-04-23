import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObjectAfterAction, SearchTree, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { INewTag } from '../../INewTag';
import { searchTagService } from "./service/searchTagService";

export class editTagAction implements ISearchTreeAction {
    
    constructor(private tagId: number, private newTagName: string) { }

    visit(): Promise<INewTag> {
        let searchService = new searchTagService();
        return searchService.getUpdatedTag(exampleObjectAfterAction, this.tagId, this.newTagName);
    }
}