import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';

export class deleteFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(exampleObject);
        return searchService.deleteFolder(this.folderId);
    }
}