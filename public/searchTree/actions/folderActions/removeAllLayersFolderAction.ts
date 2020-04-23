import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';

export class removeAllLayersFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): Promise<any> {
        console.log('removeAllLayersFolderAction: ', this.folderId);
        let searchService = new searchFolderService(exampleObject);
        return new Promise((res, rej) => {})
    }
}