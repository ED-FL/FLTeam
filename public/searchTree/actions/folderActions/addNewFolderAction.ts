import { ISearchTreeAction } from '../ISearchTreeAction'
import ISearchTree from '../../ISearchTree';
import { exampleObject, SearchTree } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from './service/actionFolderTypes';

export class addNewFolderAction implements ISearchTreeAction {
    constructor(private folderId: string, private newFolderName: string) {

    }

    visit(): Promise<ISearchTree> {
        let searchService = new searchFolderService(actionFolderTypes.AddFolder);
        return searchService.executeAction(this.folderId, exampleObject ,this.newFolderName);
    }
    
    public static addNewFolder(tree: ISearchTree ,newFolderName: string, perentId: string): void {

        let collapsedNewFolder: boolean = false;
        collapsedNewFolder = this.checkForCollapsedDisplay(tree);

        tree.folders.push(new SearchTree(`adeed-1${Math.random()}`, newFolderName, 'owner', perentId, [], [], collapsedNewFolder, false, false));   
    }
    
    private static checkForCollapsedDisplay(tree: ISearchTree): boolean {

        if(tree.folders.length > 0) {
            if(tree.folders[0].collapsed) {
                return true;
            }
        }

        if(tree.tags.length > 0) {
            if(tree.tags[0].collapsed) {
                return true;
            }
        }
        return false;
    }
}