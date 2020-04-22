import { ISearchTreeAction } from '../ISearchTreeAction'

export class editTagAction implements ISearchTreeAction {
    constructor(private tagId: number, private newTagName: string) {

    }

    visit(): void {
        console.log('tag edited: ' + this.tagId, this.newTagName);
    }
}