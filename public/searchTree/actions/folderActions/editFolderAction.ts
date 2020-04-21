import { ISearchTreeAction } from '../ISearchTreeAction'

export class editFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): void {
        console.log('folder edited: ' + this.folderId);
    }
}