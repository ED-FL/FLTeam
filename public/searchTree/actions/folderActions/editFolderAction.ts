import { ISearchTreeAction } from '../ISearchTreeAction'

export class editFolderAction implements ISearchTreeAction {
    constructor(private folderId: number, private newFolderName: string) {

    }

    visit(): void {
        console.log('folder edited: ' + this.folderId, this.newFolderName);
    }
}