import { ISearchTreeAction } from '../ISearchTreeAction'

export class startRuleTagAction implements ISearchTreeAction {
    constructor(private tagId: string) {

    }

    visit(): Promise<any> {
        console.log('tag rule sterted: ' + this.tagId);
        return new Promise((res, rej) => {})
    }
}