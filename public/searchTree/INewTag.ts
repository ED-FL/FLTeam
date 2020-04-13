// import {RuleStatus} from "flcore/Legislature/RuleStatus";

export interface INewTag {
    tagId: string;
    tagName: string;
    queryId: string;
    extraInfo?: IExtraInfo;
    type: string;
    parentFolderId: string;
}

export interface IExtraInfo {
    kmlLink?: string;
    ruleInfo?: IRuleInfo
}

export interface IRuleInfo {
    ruleId: number;
    ruleStatus: any; //RuleStatus
}