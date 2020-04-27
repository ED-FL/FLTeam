import * as angular from "angular";
import { editTagAction } from "../actions/tagActions/editTagAction";
import { deleteTagAction } from "../actions/tagActions/deleteTagAction";
import { exportTagAction } from "../actions/tagActions/exportTagAction";
import { displayKMLTagAction } from "../actions/tagActions/displayKMLTagAction";
import { startRuleTagAction } from "../actions/tagActions/startRuleTagAction";
import { stopRuleTagAction } from "../actions/tagActions/stopRuleTagAction";
import { duplicteTagAction } from "../actions/tagActions/dupicateTagAction";
import { INewTag } from "../INewTag";

angular.module('app')
.component('tagsHandling', {
    templateUrl: './tagsHandling.html',
    bindings: {
        tree : '=',
        handleAction : '='
    },
    controller: function($mdDialog) {

        var $ctrl = this;

        $ctrl.checkboxKML = false;

        $ctrl.showEditTagDialog = (ev, tag : INewTag): void => {
            var confirm = $mdDialog.prompt()
              .title('הכנס שם חדש')
              .placeholder('שם תגית')
              .required(true)
              .ok('עדכן שם')
              .cancel('בטל');
        
            $mdDialog.show(confirm).then((newTagName) => {
                onTagEdited(tag, newTagName);
            }, () => {})
        };

        $ctrl.showDeleteConfirm = (event, tag: INewTag): void => {            
            var confirm = $mdDialog.confirm()
                  .title('?האם אתה בטוח שברצונך למחוק את התגית')
                  .textContent('התגית תמחק לצמיתות')
                  .ok('מחק')
                  .cancel('ביטול');
        
            $mdDialog.show(confirm).then(() => {
                onTagDeleted(tag);              
            }, () => {});
        };

        const onTagEdited = (tag : INewTag, newTagName: string): void => {
            $ctrl.handleAction(new editTagAction(tag.tagId, newTagName));             
        }

        const onTagDeleted = (tag: INewTag): void => {            
            $ctrl.handleAction(new deleteTagAction(tag.tagId));            
        }

        $ctrl.onTagClicked = (tag: INewTag): void => {
            console.log('go to tag link: ', tag);  
        };
 
        $ctrl.openMenu = ($mdMenu, event): void => {                                
            $mdMenu.open(event);
        };

        $ctrl.onTagExported = (tag: INewTag): void => {
            this.handleAction(new exportTagAction(tag.tagId));
        }        
        
        $ctrl.onDisplayKmlTag = (tag: INewTag): void => {
            this.handleAction(new displayKMLTagAction(tag.tagId));
            $ctrl.checkboxKML = !$ctrl.checkboxKML;
        }

        $ctrl.onTagRuleStarted = (tag: INewTag): void => {
            this.handleAction(new startRuleTagAction(tag.tagId));
            tag.isRuleStopped = !tag.isRuleStopped;
        }

        $ctrl.onTagRuleStoped = (tag: INewTag): void => {
            this.handleAction(new stopRuleTagAction(tag.tagId));
            tag.isRuleStopped = !tag.isRuleStopped;
        }

        $ctrl.onTagDuplicated = (tag: INewTag): void => {
            $ctrl.handleAction(new duplicteTagAction(tag.tagId));   
        }
    }
})
