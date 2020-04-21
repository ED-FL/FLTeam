import { ISearchTreeAction } from '../ISearchTreeAction'

export class removeSharingFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): void {
        console.log('folder sharing removed: ' + this.folderId);
    }
}