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