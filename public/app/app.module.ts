

import { NgModule } from "@angular/core";
import { UpgradeModule } from "@angular/upgrade/static";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { NameParser } from "./admin/nameParser.service";
import { UnreviewedTalkComponent } from "./home/unreviewedTalk.component";
import { TalkDurationPipe } from "./common/talkDuration.pipe";
import { ProfileComponent } from "./profile/profile.component";

function getLocation(angularOneInjector: any){
return angularOneInjector.get('$location');
}

function getCurrentIdentity(angularOneInjector: any){
  return angularOneInjector.get('currentIdentity');
  }

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UpgradeModule
  ],
  declarations: [
    AppComponent,
    UnreviewedTalkComponent,
    TalkDurationPipe,
    ProfileComponent
  ],
  providers: [
    NameParser,
    {provide: '$location', useFactory: getLocation, deps: ['$injector']},
    {provide: 'currentIdentity', useFactory: getCurrentIdentity, deps: ['$injector']}
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    UnreviewedTalkComponent,
    ProfileComponent
  ]
})
export class AppModule { }