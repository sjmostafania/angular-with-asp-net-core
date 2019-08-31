import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toaster: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();

    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    this.service.register().subscribe((res: any) => {
      if (res.succeeded) {
        this.service.formModel.reset();
        this.toaster.success('New User Created', 'Registration Succesful.');
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toaster.error('UserName is already taken', 'Registration faild.')
              break;

            default:
              this.toaster.error(element.description, 'Registration faild.');
              break;
          }
        });
      }
    }, err => {
      console.log(err)
    });
  }
}