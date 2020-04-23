import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { searchFolderService } from './service/searchFolderService';
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';

export class editFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newFolderName: string) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(exampleObject);
        return searchService.updateFolder(this.folderId, this.newFolderName);
    }
}