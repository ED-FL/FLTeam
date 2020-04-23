import { ISearchTreeAction } from '../ISearchTreeAction'

export class startRuleTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): Promise<any> {
        console.log('tag rule sterted: ' + this.tagId);
        return new Promise((res, rej) => {})
    }
}