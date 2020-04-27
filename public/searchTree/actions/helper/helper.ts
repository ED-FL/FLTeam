import ISearchTree from "../../ISearchTree";

export class helper {
    public static generateId() {
        return Math.random().toString();
    }

    public static checkForCollapsedDisplay(tree: ISearchTree): boolean {

        if(tree.folders.length > 0) {
            if(tree.folders[0].collapsed) {
                return true;
            }
        }

        if(tree.tags.length > 0) {
            if(tree.tags[0].collapsed) {
                return true;
            }
        }
        return false;
    }
}