import ISearchTree from "./ISearchTree";
import {INewTag, IExtraInfo} from "./INewTag";

export class SearchTree implements ISearchTree {
  
    folderId: string;  
    folderName: string;
    owner: string;
    parentFolderId: string;
    folders: ISearchTree[];
    tags: any[];
  
    constructor(folderId : string, 
                folderName : string, 
                owner: string, 
                parentFolderId: string, 
                folders: ISearchTree[], 
                tags: INewTag[]) {
  
  
      this.folderId = folderId;  
      this.folderName =  folderName;
      this.owner = owner;
      this.parentFolderId = parentFolderId;
      this.folders = folders;
      this.tags = tags;
    }
  
  }
  
export class NewTag implements INewTag {
    tagId: string;  
    tagName: string;
    queryId: string;
    extraInfo?: IExtraInfo;
    type: string;
    parentFolderId: string;
  
    constructor(tagId: string, 
      tagName: string,
      queryId: string,
      extraInfo: IExtraInfo,
      type: string,
      parentFolderId: string) {
    
        this.tagId = tagId;
        this.tagName = tagName;
        this.queryId = queryId;
        this.extraInfo = extraInfo;
        this.type = type;
        this.parentFolderId = parentFolderId;   
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
        [new NewTag("tag-3-1", "innerTag-3-1", "extraInfo", null, null, "3-1"), 
        new NewTag("tag-3-2", "innerTag-3-2", "extraInfo", null, null, "3-2")]
      )],
      [new NewTag("tag-2-1", "innerTag-2-1", "extraInfo", null, null, "2-1")]
    ), new SearchTree(
      "2-2",
      "innerFolder-2-2",
      "yuval",
      "1",
      [],
      []
    )],
    [new NewTag("tag-1", "tag-1", "extraInfo", null, null, "1")]
  );