import { ISearchTreeAction } from '../ISearchTreeAction'

export class duplicateFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): void {
        console.log('folder duplicated: ' + this.folderId);
    }
}