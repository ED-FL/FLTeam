import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchFolderService } from './service/searchFolderService';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { actionFolderTypes } from './service/actionFolderTypes';

export class duplicateFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): Promise<any> {
        console.log('folder duplicated: ' + this.folderId);
        let searchService = new searchFolderService(actionFolderTypes.Duplicte);
        return searchService.executeAction(this.folderId, exampleObject);    }
}