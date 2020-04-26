import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchTagService } from './service/searchTagService';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import ISearchTree from '../../ISearchTree';
import { typesActionTag } from './service/typesActionTag';

export class deleteTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }
    visit(): Promise<ISearchTree> {
        let searchService = new searchTagService(typesActionTag.Delete);
        return searchService.executeAction(this.tagId, exampleObject);
    }

    public static deleteTag(arrayTags, index) {
        arrayTags.splice(index, 1);
    }
}