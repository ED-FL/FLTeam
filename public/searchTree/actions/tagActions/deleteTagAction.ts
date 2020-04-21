import { ISearchTreeAction } from '../ISearchTreeAction'

export class deleteTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): void {
        console.log('tag deleted: ' + this.tagId);
    }
}