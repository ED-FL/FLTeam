import { ISearchTreeAction } from '../ISearchTreeAction'

export class shareFolderAction implements ISearchTreeAction {
    constructor(private folderId: string) {

    }

    visit(): Promise<any> {
        console.log('folder shared: ' + this.folderId);
        return new Promise((res, rej) => {})
    }
}