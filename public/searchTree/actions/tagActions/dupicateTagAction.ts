import { ISearchTreeAction } from '../ISearchTreeAction'

export class duplicteTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): Promise<any> {
        console.log('tag duplicted: ' + this.tagId);
        return new Promise((res, rej) => {})
    }
}