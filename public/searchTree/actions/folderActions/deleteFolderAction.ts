import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from './service/actionFolderTypes';

export class deleteFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(exampleObject);
        return searchService.executeAction(this.folderId, exampleObject, actionFolderTypes.Delete);
    }
}