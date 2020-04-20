import { ISourceOption, IOption } from "../ISourceOptions";
import { IListItem } from "../IListItem";
import * as angular from "angular";

angular.module("app").component("layersSelection", {
  templateUrl: "./layersSelection.html",
  bindings: {},
  controller: class LayersSelectionCtrl {
    sources: Array<ISourceOption>;
    searchText: string;

    selectionService;

    constructor(layerSelectionService) {
      this.selectionService = layerSelectionService;
    }

    $onInit() {
      this.getAllLayers();
    }

    private getAllLayers() {
      //this.sources = this.selectionService.getAllLayers();
      this.sources = [
        {
          source: {
            displayName: "הענק הירוק",
            id: "1",
          },
          layers: [
            {
              displayName: "שכבה 1 בענק",
              id: "11",
            },
            {
              displayName: "שכבה 2 בענק",
              id: "12",
            },
          ],
          canSelectAll: false,
          maxSelectedLayers: 1,
        },
        {
          source: {
            displayName: "אלסטיק",
            id: "2",
          },
          layers: [
            {
              displayName: "שכבה 1 באלסטיק",
              id: "21",
            },
            {
              displayName: "שכבה 2 באלסטיק",
              id: "22",
            },
          ],
          canSelectAll: true,
        },
      ];
    }

    private convertToListItem(options: Array<IOption>): Array<IListItem> {
      let listItems = new Array<IListItem>();

      for (let option of options) {
        listItems.push({
          name: option.displayName,
          id: option.id,
          isSelected: false,
        });
      }

      return listItems;
    }

    private onSave() {}

    private onReset() {}
  },
});
