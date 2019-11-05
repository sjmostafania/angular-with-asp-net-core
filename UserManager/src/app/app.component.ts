import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserManager';
  userDetails;
  ishidden = true;
 
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.ishidden = false;
    }

    // this.service.getUserProfile().subscribe(res => {
    //   this.userDetails = res;
    //   console.log('userDetail:', this.userDetails);
    // },
    //   err => {
    //     console.log(err);
    //   });
  }
  onLogout() {
    localStorage.removeItem('token');
    location.reload();
    this.router.navigate(['/user/login']);
  }
}
