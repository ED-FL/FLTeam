import { Component, Inject } from "@angular/core";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  /*$location, toastr, currentIdentity*/
  constructor(@Inject('$location') private $location,
    @Inject('currentIdentity') private currentIdentity) {
    // this.currentIdentity = { currentUser: { firstName: "ela", lastName: "dror" } };
  }
  save(newProfile) {
    this.currentIdentity.updateUser(newProfile);
    // toastr.success('Profile Saved!');
  }

  cancel() {
    this.$location.path('/home');
  }
}
