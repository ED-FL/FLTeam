import { ISearchTreeAction } from '../ISearchTreeAction'
import { exampleObject, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { searchFolderService } from './service/searchFolderService';
import { actionFolderTypes } from './service/actionFolderTypes';
import ISearchTree from '../../ISearchTree';
import { helper } from '../helper/helper';

export class addNewTagFolderAction implements ISearchTreeAction {
    constructor(private folderId: string, private newTagName: string) {

    }

    visit(): Promise<any> {
        let searchService = new searchFolderService(actionFolderTypes.AddTag);
        return searchService.executeAction(this.folderId, exampleObject ,this.newTagName);
    }

    public static addNewTag(tree: ISearchTree ,newTagName: string, perentId: string): void {
 
        let collapsedNewTag: boolean = false;
        collapsedNewTag = helper.checkForCollapsedDisplay(tree);
        
        tree.tags.push(new NewTag(helper.generateId(), newTagName, "extraInfo", null, null, perentId, collapsedNewTag, true, false, false, false));   
    }
}