import { ISearchTreeAction } from '../ISearchTreeAction'

export class stopRuleTagAction implements ISearchTreeAction {
    constructor(private tagId: string) {

    }

    visit(): Promise<any> {
        console.log('tag rule stoped: ' + this.tagId);
        return new Promise((res, rej) => {})
    }
}