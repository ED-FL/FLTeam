import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchTagService } from './service/searchTagService';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import ISearchTree from '../../ISearchTree';

export class deleteTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }
    visit(): Promise<ISearchTree> {
        let searchService = new searchTagService(exampleObject);
        return searchService.deleteTag(this.tagId);
    }
}