import { BaseDriver } from "../../app/testingUtils/BaseDriver";
import { DriverDependency } from "../../app/testingUtils/DriverDependency";
import { DriverContext } from "../../app/testingUtils/DriverContext";
import { ISouceListItems } from "../interfaces/ISoucesListItems";

export class SourceDriver extends BaseDriver {
  static dependencies: DriverDependency[] = [];

  private source: ISouceListItems;
  private searchText: string;
  private selectAll: ({ source: ISouceListItems, selection: boolean }) => void;
  private selectLayer: ({ source: ISouceListItems, layerId: string }) => void;
  private unSelectLayer: ({ source: ISouceListItems, layerId: string }) => void;

  constructor(driverContext: DriverContext, component?) {
    super(driverContext, SourceDriver, component);
  }

  get = {
    controller: () => this.component.children().scope().$ctrl,
    sourceDisplayName:()=>,
    isSourceDisabled:()=>,
    isSourceChecked:()=>,
    isExpanded:()=>,
    expandIcon:()=>,
    layerDisplayName:(layerId:string)=>,
    isLayerDisabled: (layerId:string)=>,
    isLayerChecked:(layerId:string)=>,
    numDisplayedLayers:()=>,
    numDisabledLayers:()=>
  };

  given = {
    source: (source: ISouceListItems) => {
      this.source = source;
      return this.givenReaturnVal;
    },
    searchText: (searchText: string) => {
      this.searchText = searchText;
      return this.givenReaturnVal;
    },
    selectAll: (
      selectAll: ({ source: ISouceListItems, selection: boolean }) => void
    ) => {
      this.selectAll = selectAll;
      return this.givenReaturnVal;
    },
    selectLayer: (
      selectLayer: ({ source: ISouceListItems, layerId: string }) => void
    ) => {
      this.selectLayer = selectLayer;
      return this.givenReaturnVal;
    },
    unSelectLayer: (
      unSelectLayer: ({ source: ISouceListItems, layerId: string }) => void
    ) => {
      this.unSelectLayer = unSelectLayer;
      return this.givenReaturnVal;
    },
  };

  when = {
    created: () => {
        return this.whenReturnVal;
    },
    clickOnExpendButton: () => {
      this.getElementByDataHook("expand-icon").click();
      return this.whenReturnVal;
    },
    clickOnSourceCheckBox: () => {
      this.getElementByDataHook("source-checkbox").click();
      return this.whenReturnVal;
    },
    clickOnLayerCheckBox: (layerId:string) => {
        this.getElementByDataHook("layer-checkbox").click();
        return this.whenReturnVal;
      },
  };

  private whenReturnVal = { and: this.when, get: this.get };
  private givenReaturnVal = { and: this.given, then: this };
}
