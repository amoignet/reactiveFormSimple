import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  form: FormGroup
  // forbiddenProjectNames =['Test', 'test']

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      // projectName: new FormControl('', [Validators.required, this.forbiddenNames.bind(this)]),
      projectName: new FormControl('', Validators.required, this.asyncForbiddenProjectNames),
      email: new FormControl('', [Validators.required, Validators.email]),
      projectStatus: new FormControl('Finished')
    })
  }

  onSubmitForm() {
    console.log(this.form);
    console.log(this.form.value);
  }

  // forbiddenNames(control: FormControl): { [s: string]: boolean } {
  //   if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //     return { nameIsForbidden: true };
  //   }
  //   return null;
  // }

  asyncForbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
       if (control.value === 'Test') {
         resolve({ 'nameIsForbidden': true });
       }  else {
         resolve(null);
       }
     }, 3000);
   });
   return promise;
  }
}
