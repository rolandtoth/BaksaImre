import {Component} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {ApiService} from './../services/api.service'

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent {
  successMessage: string = 'Sikeres küldés'
  processing: boolean = false
  formSuccess: boolean = false
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  })

  constructor(private apiService: ApiService) {}

  get name() {
    return this.form.get('name')
  }

  get email() {
    return this.form.get('email')
  }

  get message() {
    return this.form.get('message')
  }

  processForm() {
    this.processing = true

    this.apiService.saveContact(this.form.value).subscribe(response => {
      if (!response['success']) {
        this.form.setErrors({
          invalidData: true
        })
        this.processing = false
      } else {
        this.form.reset()
        this.formSuccess = true
        this.successMessage = response['message']
      }
    })
  }
}
