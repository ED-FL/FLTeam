import { ISearchTreeAction } from '../ISearchTreeAction'

export class sharingInfoFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): void {
        console.log('folder sharing info: ' + this.folderId);
    }
}