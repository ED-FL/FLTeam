import { ISearchTreeAction } from '../ISearchTreeAction'

export class sharingInfoFolderAction implements ISearchTreeAction {
    constructor(private folderId: string) {

    }

    visit(): Promise<any> {
        console.log('folder sharing info: ' + this.folderId);
        return new Promise((res, rej) => {})
    }
}