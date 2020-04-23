import { ISearchTreeAction } from '../ISearchTreeAction'

export class duplicateFolderAction implements ISearchTreeAction {
    constructor(private folderId: number) {

    }

    visit(): Promise<any> {
        console.log('folder duplicated: ' + this.folderId);
        return new Promise((res, rej) => {})
    }
}