import { ISearchTreeAction } from '../ISearchTreeAction'
import { INewTag } from '../../INewTag';
import { searchTagService } from './service/searchTagService';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';

export class deleteTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }
    visit(): Promise<INewTag> {
        let searchService = new searchTagService(exampleObject);
        return searchService.deleteTag(this.tagId);
    }
}