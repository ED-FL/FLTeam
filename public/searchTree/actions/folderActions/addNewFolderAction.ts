import { ISearchTreeAction } from '../ISearchTreeAction'

export class addNewFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newFolderName: string) {

    }

    visit(): void {
        console.log('folder added: ' + this.folderId, this.newFolderName);
    }
}