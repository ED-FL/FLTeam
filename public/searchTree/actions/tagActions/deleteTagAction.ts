import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchTagService } from './service/searchTagService';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import ISearchTree from '../../ISearchTree';
import { typesActionTag } from './service/typesActionTag';
import { INewTag } from '../../INewTag';

export class deleteTagAction implements ISearchTreeAction {
    constructor(private tagId: string) {

    }
    visit(): Promise<ISearchTree> {
        let searchService = new searchTagService(typesActionTag.Delete);
        return searchService.executeAction(this.tagId, exampleObject);
    }

    public static deleteTag(arrayTags: INewTag[], index: number): void {
        arrayTags.splice(index, 1);
    }
}