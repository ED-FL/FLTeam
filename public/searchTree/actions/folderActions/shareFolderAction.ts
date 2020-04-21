import { ISearchTreeAction } from '../ISearchTreeAction'

export class shareFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): void {
        console.log('folder shared: ' + this.folderId);
    }
}