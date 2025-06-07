import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, HttpClientModule,
            ReactiveFormsModule, RecaptchaModule,
            RecaptchaFormsModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})

export class ContactComponent {


  contactData = {
    name: '',
    email: '',
    message: ''
  };
//56982414460
  sendMessage(): void {
    const whatsappNumber = '+56982414460'; // Reemplaza con el número de WhatsApp deseado
    const message = `Hola, mi nombre es ${this.contactData.name}. Mi correo es ${this.contactData.email} y este es mi mensaje: ${this.contactData.message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  }

  /*
  userForm : FormGroup;
  captchaResponse: string | null = null;
  
  constructor(private http: HttpClient) {
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

  onSubmit() {
    console.log(this.userForm.value);
   
    if (this.userForm.valid) {
      const formData = { // Reemplaza con la dirección de destino adecuada
        subject: 'Nuevo mensaje de contacto',
        text: `
          Nombre: ${this.userForm.get('firstName')?.value}
          Email: ${this.userForm.get('email')?.value}
          Mensaje: ${this.userForm.get('message')?.value}
        `,
        captcha: this.userForm.get('recaptcha')?.value
      };

      this.http.post('https://tu-servidor/api/enviar-correo', formData)
        .subscribe({
          next: (response) => {
            console.log('Correo enviado con éxito:', response);
            // Maneja la respuesta del servidor aquí (e.g., muestra un mensaje de éxito)
          },
          error: (error) => {
            console.error('Error al enviar el correo:', error);
          }
        });
    } else {
      console.log('Formulario no válido');
    } 
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResponse = captchaResponse;
    this.userForm.get('recaptcha')?.setValue(captchaResponse);
  } */
}
