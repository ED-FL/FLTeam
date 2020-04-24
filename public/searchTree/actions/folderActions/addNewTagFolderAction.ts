import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';

export class addNewTagFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newTagName: string) {

    }

    visit(): Promise<any> {
        console.log('addNewTagFolderAction: ', this.folderId, '-new name- ', this.newTagName);
        let searchService = new searchFolderService(null);
        return new Promise((res, rej) => {})
    }
}