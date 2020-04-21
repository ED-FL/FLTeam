// import {RuleStatus} from "flcore/Legislature/RuleStatus";

export interface INewTag {
    tagId: string;
    tagName: string;
    queryId: string;
    extraInfo?: IExtraInfo;
    type: string;
    parentFolderId: string;
    collapsed : boolean;
    isRule : boolean;
    isRuleStopped : boolean;
    hasKml : boolean;
}

export interface IExtraInfo {
    kmlLink?: string;
    ruleInfo?: IRuleInfo
}

export interface IRuleInfo {
    ruleId: number;
    ruleStatus: any; //RuleStatus
}