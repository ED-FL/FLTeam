import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchFolderService } from './service/searchFolderService';
import { exampleObject, SearchTree, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { actionFolderTypes } from './service/actionFolderTypes';
import _ from 'underscore';
import ISearchTree from '../../ISearchTree';

export class duplicateFolderAction implements ISearchTreeAction {
    constructor(private folderId: string) {

    }

    visit(): Promise<any> {
        console.log('folder duplicated: ' + this.folderId);
        let searchService = new searchFolderService(actionFolderTypes.Duplicte);
        return searchService.executeAction(this.folderId, exampleObject);    
    }

    public static duplicteFolder(currentFolders: ISearchTree[], index: number): void {

        var duplictedFolder = this.cloneObject(currentFolders[index]);
        currentFolders.push(duplictedFolder);
    }

    private static cloneObject(obj) {
        let copy;
        
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;
    
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneObject(obj[i]);
            }
            return copy;
        }
    
        // Handle Object
        if (obj instanceof Object) {
            if(obj instanceof SearchTree) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = this.cloneObject(obj[attr]);                        
                    }
                }
                let copyTree = new SearchTree(
                    Math.floor(Math.random()*100).toString(),
                    copy.folderName,
                    copy.owner,
                    copy.parentFolderId,
                    copy.folders,
                    copy.tags,
                    copy.collapsed,
                    copy.isSharedFolder,
                    false);
                return copyTree;
            }

            if(obj instanceof NewTag) {

                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) { 
                        copy[attr] = this.cloneObject(obj[attr]);
                    }
                }

                let copyTag = new NewTag(
                    Math.floor(Math.random()*100).toString(),
                    copy.tagName,
                    copy.queryId,
                    copy.extraInfo,
                    copy.type,
                    copy.parentFolderId,
                    copy.collapsed,
                    copy.isRule,
                    copy.isRuleStopped,
                    copy.hasKml,
                    copy.isSharedTag);

                return copyTag;
            }
        }
    
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
}