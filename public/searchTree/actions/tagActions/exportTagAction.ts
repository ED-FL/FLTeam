import { ISearchTreeAction } from '../ISearchTreeAction'

export class exportTagAction implements ISearchTreeAction {
    constructor(private tagId: number) {

    }

    visit(): Promise<any> {
        console.log('tag exported: ' + this.tagId);
        return new Promise((res, rej) => {})
    }
}