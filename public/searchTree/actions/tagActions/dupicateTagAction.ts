import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchTagService } from './service/searchTagService';
import { typesActionTag } from './service/typesActionTag';
import { exampleObject, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { INewTag } from '../../INewTag';
import * as angular from 'angular'
import { helper } from '../helper/helper';

export class duplicteTagAction implements ISearchTreeAction {
    constructor(private tagId: string) {

    }

    visit(): Promise<any> {
        console.log('tag duplicted: ' + this.tagId);
        let searchService = new searchTagService(typesActionTag.Duplicte);
        return searchService.executeAction(this.tagId, exampleObject);
    }

    public static duplicteTag(currentTags: INewTag[], index: number): void {

        let duplictedTag = angular.copy(currentTags[index]);
        duplictedTag.tagId = helper.generateId();
        currentTags.push(duplictedTag);
    }
}