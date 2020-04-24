import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchTagService } from "./service/searchTagService";
import ISearchTree from '../../ISearchTree';
import { typesActionTag } from './service/typesActionTag';

export class editTagAction implements ISearchTreeAction {
    
    constructor(private tagId: number, private newTagName: string) { }

    visit(): Promise<ISearchTree> {
        let searchService = new searchTagService(typesActionTag.Edit);
        return searchService.executeAction(this.tagId, exampleObject ,this.newTagName)
    }
}