import ISearchTree from "../ISearchTree";
import {INewTag, IExtraInfo} from "../INewTag";

export class SearchTree implements ISearchTree {

  constructor(public folderId : string, 
              public folderName : string, 
              public owner: string, 
              public parentFolderId: string, 
              public folders: ISearchTree[], 
              public tags: INewTag[],
              public collapsed : boolean) {
  }
}

export class NewTag implements INewTag {

    constructor(public tagId: string, 
                public tagName: string,
                public queryId: string,
                public extraInfo: IExtraInfo,
                public type: string,
                public parentFolderId: string,
                public collapsed : boolean) {
      }
  }

  export const exampleObject = new SearchTree(
    "1",
    "mainFolder-1",
    "yuval",
    null,
    [new SearchTree(
      "2-1",
      "innerFolder-2-1",
      "yuval",
      "1",
      [new SearchTree(
        "3-1",
        "innerFolder-3-1",
        "yuval",
        "2-1",
        [],
        [new NewTag("tag-3-1", "innerTag-3-1", "extraInfo", null, null, "3-1", true), 
        new NewTag("tag-3-2", "innerTag-3-2", "extraInfo", null, null, "3-2", true)]
        ,true
      )],
      [new NewTag("tag-2-1", "innerTag-2-1", "extraInfo", null, null, "2-1", true)]
      ,true
    ), new SearchTree(
      "2-2",
      "innerFolder-2-2",
      "yuval",
      "1",
      [],
      [],
      true
    )],
    [new NewTag("tag-1", "tag-1", "extraInfo", null, null, "1", true)],
    true
  );