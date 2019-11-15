import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = "";
  data: any;
  localdata: any;
  spinner = false;
  title = 'GitUserProfile';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }
  searchUser() {

    if (this.username) {
      this.spinner = true;
      this.localdata = localStorage.getItem(this.username);

      if (!this.localdata) {
        this.http.get('https://api.github.com/users/' + this.username + '?access_token=b365a6b512979e15cd40a91f6deac23494')
          .subscribe(Response => {
            this.spinner = false;
            this.data = Response;
            console.log(this.data);
            console.log(JSON.stringify(this.data));
            localStorage.setItem(this.username, JSON.stringify(this.data));
          }, error => {
            this.spinner = false;
            this.data = "";
            this.openSnackBar(`Invalid User name`, 'ok');
          });
      } else {
        this.data = JSON.parse(this.localdata);
        this.spinner = false;
        console.log(this.data)
      }
    } else {
      this.data = "";
      this.openSnackBar(`No data`, 'ok');
    }
  }
  openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
       verticalPosition:'top',
      horizontalPosition: 'right',
    });
  }
}


