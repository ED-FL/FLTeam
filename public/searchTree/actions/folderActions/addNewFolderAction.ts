import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from './service/actionFolderTypes';

export class addNewFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newFolderName: string) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(actionFolderTypes.Add);
        return searchService.executeAction(this.folderId, exampleObject ,this.newFolderName);
    }
}