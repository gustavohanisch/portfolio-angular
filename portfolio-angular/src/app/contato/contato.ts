// src/app/contato/contato.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ReactiveFormsModule],    // libera formGroup/formControlName no HTML
  templateUrl: './contato.html',
})
export class Contato {
  private fb = inject(FormBuilder);
  private service = inject(ContatoService);
  private cdr = inject(ChangeDetectorRef);
  enviando = false; sucesso = ''; erro = ''; // estados de tela

  form = this.fb.nonNullable.group({
  nome: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  mensagem: ['', [Validators.required, Validators.minLength(10)]],
});

  onSubmit() {
    this.sucesso = ''; this.erro = '';
    if (this.form.invalid) {          // trava: nem chama a API se inválido
      this.form.markAllAsTouched();   // força exibir os erros de campo
      return;
    }

    this.enviando = true; // desabilita o botão enquanto envia
    this.service.enviar(this.form.getRawValue()).subscribe({
      next: (resp) => {
        this.sucesso = resp.mensagem;
              this.form.reset(); // limpa o formulário
      this.enviando = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.erro = 'Não foi possível enviar. Tente novamente.';
      this.enviando = false; // reabilita o botão no erro
      this.cdr.detectChanges();
    },
  });
}
}