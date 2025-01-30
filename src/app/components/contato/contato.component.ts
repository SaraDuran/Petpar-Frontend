import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    const contactDetails = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
    };

    this.contactService.sendMessage(contactDetails).subscribe({
      next: (response) => {
        console.log('Contato enviado:', response);
        alert('Sua mensagem foi enviada com sucesso!');
        this.clearForm();
      },
      error: (error) => {
        console.error('Erro ao enviar contato:', error);
        alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
      },
    });
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
