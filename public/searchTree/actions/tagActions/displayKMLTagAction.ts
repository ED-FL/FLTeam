import { ISearchTreeAction } from '../ISearchTreeAction'

export class displayKMLTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): void {
        console.log('tag kml displayd: ' + this.tagId);
    }
}