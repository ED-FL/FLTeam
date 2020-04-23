import * as angular from "angular";
import { editTagAction } from "../actions/tagActions/editTagAction";
import { deleteTagAction } from "../actions/tagActions/deleteTagAction";
import { exportTagAction } from "../actions/tagActions/exportTagAction";
import { displayKMLTagAction } from "../actions/tagActions/displayKMLTagAction";
import { startRuleTagAction } from "../actions/tagActions/startRuleTagAction";
import { stopRuleTagAction } from "../actions/tagActions/stopRuleTagAction";
import { duplicteTagAction } from "../actions/tagActions/dupicateTagAction";

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

        $ctrl.showEditTagDialog = (ev, folder) => {
            var confirm = $mdDialog.prompt()
              .title('הכנס שם חדש')
              .placeholder('שם תגית')
              .required(true)
              .ok('עדכן שם')
              .cancel('בטל');
        
            $mdDialog.show(confirm).then((newTagName) => {
                onTagEdited(folder, newTagName);
            }, () => {})
        };

        $ctrl.showDeleteConfirm = (event, folder) => {            
            var confirm = $mdDialog.confirm()
                  .title('?האם אתה בטוח שברצונך למחוק את התגית')
                  .textContent('התגית תמחק לצמיתות')
                  .ok('מחק')
                  .cancel('ביטול');
        
            $mdDialog.show(confirm).then(() => {
                onTagDeleted(folder);              
            }, () => {});
        };

        const onTagEdited = (tag, newTagName) => {
            let getNewTag = $ctrl.handleAction(new editTagAction(tag.tagId, newTagName));             
        }

        const onTagDeleted = (tag) => {            
            let getNewTag = $ctrl.handleAction(new deleteTagAction(tag.tagId));            
        }

        $ctrl.onTagClicked = (tag): void => {
            console.log('go to tag link: ', tag);  
        };
 
        $ctrl.openMenu = ($mdMenu, event): void => {                                
            $mdMenu.open(event);
        };

        $ctrl.onTagExported = (tag) => {
            this.handleAction(new exportTagAction(tag.tagId));
        }        
        
        $ctrl.onDisplayKmlTag = (tag) => {
            this.handleAction(new displayKMLTagAction(tag.tagId));
            $ctrl.checkboxKML = !$ctrl.checkboxKML;
        }

        $ctrl.onTagRuleStarted = (tag) => {
            this.handleAction(new startRuleTagAction(tag.tagId));
            tag.isRuleStopped = !tag.isRuleStopped;
        }

        $ctrl.onTagRuleStoped = (tag) => {
            this.handleAction(new stopRuleTagAction(tag.tagId));
            tag.isRuleStopped = !tag.isRuleStopped;
        }

        $ctrl.onTagDuplicated = (tag) => {
            $ctrl.handleAction(new duplicteTagAction(tag.tagId));   
        }
    }
})
