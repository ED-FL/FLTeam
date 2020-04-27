import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchTagService } from './service/searchTagService';
import { typesActionTag } from './service/typesActionTag';
import { exampleObject, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { INewTag } from '../../INewTag';

export class duplicteTagAction implements ISearchTreeAction {
    constructor(private tagId: string) {

    }

    visit(): Promise<any> {
        console.log('tag duplicted: ' + this.tagId);
        let searchService = new searchTagService(typesActionTag.Duplicte);
        return searchService.executeAction(this.tagId, exampleObject);
    }

    public static duplicteTag(currentTags: INewTag[], index: number): void {

        let duplictedTag = new NewTag(
            Math.floor(Math.random()*100).toString(),
            currentTags[index].tagName,
            currentTags[index].queryId,
            currentTags[index].extraInfo,
            currentTags[index].type,
            currentTags[index].parentFolderId,
            currentTags[index].collapsed,
            currentTags[index].isRule,
            currentTags[index].isRuleStopped,
            currentTags[index].hasKml,
            currentTags[index].isSharedTag);
        
        currentTags.push(duplictedTag);
    }
}