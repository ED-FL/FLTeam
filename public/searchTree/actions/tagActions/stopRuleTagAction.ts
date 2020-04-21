import { ISearchTreeAction } from '../ISearchTreeAction'

export class stopRuleTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): void {
        console.log('tag rule stoped: ' + this.tagId);
    }
}