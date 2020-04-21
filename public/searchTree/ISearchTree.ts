import {INewTag} from "./INewTag";

export interface ISearchTree {
    folderId: string;
    folderName: string;
    owner: string;
    parentFolderId: string;
    folders: ISearchTree[];
    tags: INewTag[];
    collapsed : boolean;
    isSharedFolder: boolean;
}

export default ISearchTree;