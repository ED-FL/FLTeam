import { ISearchTreeAction } from './ISearchTreeAction'

export class deleteFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): void {
        console.log('folder deleted: ' + this.folderId);
    }
}