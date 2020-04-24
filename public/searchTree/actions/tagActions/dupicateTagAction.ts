import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchTagService } from './service/searchTagService';
import { typesActionTag } from './service/typesActionTag';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';

export class duplicteTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): Promise<any> {
        console.log('tag duplicted: ' + this.tagId);
        let searchService = new searchTagService(typesActionTag.Duplicte);
        return searchService.executeAction(this.tagId, exampleObject);
    }
}