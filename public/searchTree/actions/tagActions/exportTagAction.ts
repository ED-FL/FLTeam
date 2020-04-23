import { ISearchTreeAction } from '../ISearchTreeAction'

export class exportTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): void {
        console.log('tag exported: ' + this.tagId);
    }
}