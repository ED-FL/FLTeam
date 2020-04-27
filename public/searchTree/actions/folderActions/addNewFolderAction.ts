import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { exampleObject, SearchTree } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from './service/actionFolderTypes';
import { helper } from '../helper/helper';

export class addNewFolderAction implements ISearchTreeAction {
    constructor(private folderId: string, private newFolderName: string) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(actionFolderTypes.AddFolder);
        return searchService.executeAction(this.folderId, exampleObject ,this.newFolderName);
    }
    
    public static addNewFolder(tree: ISearchTree ,newFolderName: string, perentId: string): void {

        let collapsedNewFolder: boolean = false;
        collapsedNewFolder = helper.checkForCollapsedDisplay(tree);

        tree.folders.push(new SearchTree(helper.generateId(), newFolderName, 'owner', perentId, [], [], collapsedNewFolder, false, false));   
    }
}