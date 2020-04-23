import { ISearchTreeAction } from '../ISearchTreeAction'

export class removeSharingFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): Promise<any> {
        console.log('folder sharing removed: ' + this.folderId);
        return new Promise((res, rej) => {})
    }
}