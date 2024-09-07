import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,
            ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})

export class ContactComponent {

  userForm : FormGroup;
  captchaResponse: string | null = null;
  
  constructor() {
    this.userForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9\s.,!?]*$/) // Permitir solo caracteres alfanuméricos y algunos signos de puntuación
      ]),
      recaptcha: new FormControl('', [Validators.required])
    })
  }

  onSubmit(e: any) {
   
    
    alert("asdasdasd")
    e.preventDefault();
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Maneja el envío del formulario aquí, incluyendo el captchaResponse si es necesario
    } else {
      console.log('Formulario no válido');
    }
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResponse = captchaResponse;
    this.userForm.get('recaptcha')?.setValue(captchaResponse);
  }
}
