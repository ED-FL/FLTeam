import { ISearchTreeAction } from '../ISearchTreeAction'

export class startRuleTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): void {
        console.log('tag rule sterted: ' + this.tagId);
    }
}