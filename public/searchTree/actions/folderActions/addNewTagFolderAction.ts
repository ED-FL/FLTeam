import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObject, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from './service/actionFolderTypes';

export class addNewTagFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newTagName: string) {

    }

    visit(): Promise<any> {
        let searchService = new searchFolderService(actionFolderTypes.AddTag);
        return searchService.executeAction(this.folderId, exampleObject ,this.newTagName);
    }

    public static addNewTag(tree ,newTagName, perentId) {
 
        let collapsedNewTag = false;
        collapsedNewTag = this.checkForCollapsedDisplay(tree);
        
        tree.tags.push(new NewTag(Math.floor(Math.random()*100).toString(), newTagName, "extraInfo", null, null, perentId, collapsedNewTag, true, false, false, false));   
    }

    private static checkForCollapsedDisplay(tree) {

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