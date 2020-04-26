import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from './service/actionFolderTypes';

export class addNewTagFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newTagName: string) {

    }

    visit(): Promise<any> {
        let searchService = new searchFolderService(actionFolderTypes.AddTag);
        return searchService.executeAction(this.folderId, exampleObject ,this.newTagName);
    }
}