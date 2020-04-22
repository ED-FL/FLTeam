import * as angular from "angular";
import { editTagAction } from "../actions/tagActions/editTagAction";
import { deleteTagAction } from "../actions/tagActions/deleteTagAction";
import { exportTagAction } from "../actions/tagActions/exportTagAction";
import { displayKMLTagAction } from "../actions/tagActions/displayKMLTagAction";
import { startRuleTagAction } from "../actions/tagActions/startRuleTagAction";
import { stopRuleTagAction } from "../actions/tagActions/stopRuleTagAction";


angular.module('app')
.component('tagsHandling', {
    templateUrl: './tagsHandling.html',
    bindings: {
        tree : '=',
        handleAction : '='
    },
    controller: function() {

        var $ctrl = this;

        $ctrl.checkboxKML = false;

        $ctrl.onTagClicked = (tag): void => {
            console.log('go to tag link: ', tag);  
        };
 
        $ctrl.openMenu = ($mdMenu, event): void => {                    
            $mdMenu.open(event);
        };

        $ctrl.onTagEdited = (tag) => {
            this.handleAction(new editTagAction(tag.tagId));
        }

        $ctrl.onTagDeleted = (tag) => {
            this.handleAction(new deleteTagAction(tag.tagId));
        }

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
    }
})
