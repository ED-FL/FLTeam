import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from "./service/actionFolderTypes";
import { exampleObject } from '../../searchTreePerent/SearchTreeImplement';

export class editFolderAction implements ISearchTreeAction {
    constructor(private folderId: string, private newFolderName: string) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(actionFolderTypes.Edit);
        return searchService.executeAction(this.folderId, exampleObject, this.newFolderName);
    }

    public static editFolder(tree: ISearchTree ,newFolderName: string): void {
        tree.folderName = newFolderName;      
    }
}