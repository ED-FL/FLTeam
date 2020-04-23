import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { exampleObject, SearchTree } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';

export class addNewFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newFolderName: string) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(exampleObject);
        return searchService.addNewFolder(this.folderId, this.newFolderName);
    }
}