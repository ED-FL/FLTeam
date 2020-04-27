import { ISearchTreeAction } from '../ISearchTreeAction'
import { searchFolderService } from './service/searchFolderService';
import { exampleObject, SearchTree, NewTag } from '../../searchTreePerent/SearchTreeImplement';
import { actionFolderTypes } from './service/actionFolderTypes';
import ISearchTree from '../../ISearchTree';
import * as angular from 'angular'
import { INewTag } from '../../INewTag';
import { helper } from '../helper/helper';

export class duplicateFolderAction implements ISearchTreeAction {
    constructor(private folderId: string) {

    }

    visit(): Promise<any> {
        console.log('folder duplicated: ' + this.folderId);
        let searchService = new searchFolderService(actionFolderTypes.Duplicte);
        return searchService.executeAction(this.folderId, exampleObject);    
    }

    public static duplicteFolder(currentFolders: ISearchTree[], index: number): void {

        var copiedTree = this.cloneTree(currentFolders[index])
        currentFolders.push(copiedTree);
    }

    private static cloneTree(tree: ISearchTree) {

        let copiedFolder: ISearchTree = angular.copy(tree);
        copiedFolder.folderId = helper.generateId();
        copiedFolder.tags = this.cloneTags(tree.tags);

        if(tree.folders.length === 0) {            
            return copiedFolder;
        }

        copiedFolder.folders = this.cloneFolders(tree.folders);
        return copiedFolder;
    }

    private static cloneFolders(folders: ISearchTree[]) {
        
        let copiedFolders: ISearchTree[] = [];
        
        folders.forEach(folder => {
            let copiedFolder = this.cloneTree(folder);
            copiedFolders.push(copiedFolder);
        });
        
        return copiedFolders;
    }

    private static cloneTags(tags: INewTag[]) {
        
        let copiedTags: INewTag[] = [];

        tags.forEach(tag => {
            let copyTag = angular.copy(tag);
            copyTag.tagId = helper.generateId();    
            copiedTags.push(copyTag);
        });

        return copiedTags;
    }
}