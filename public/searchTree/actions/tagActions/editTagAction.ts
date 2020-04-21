import { ISearchTreeAction } from '../ISearchTreeAction'

export class editTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): void {
        console.log('tag edited: ' + this.tagId);
    }
}