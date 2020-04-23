import { ISearchTreeAction } from '../ISearchTreeAction'

export class displayKMLTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): Promise<any> {
        console.log('tag kml displayd: ' + this.tagId);
        return new Promise((res, rej) => {})
    }
}