// src/app/contato.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContatoService } from './contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ReactiveFormsModule],  // libera formGroup/formControlName no HTML
  templateUrl: './contato.html',
})
export class Contato {
  private fb = inject(FormBuilder);
  private service = inject(ContatoService);
  enviando = false; sucesso = ''; erro = ''; // estados de tela

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

onSubmit() {
  console.log('BOTÃO FOI CLICADO');

  this.sucesso = '';
  this.erro = '';

  if (this.form.invalid) {
    console.log('FORMULÁRIO INVÁLIDO');
    this.form.markAllAsTouched();
    return;
  }

  console.log('FORMULÁRIO VÁLIDO');

  this.enviando = true;

  const dados = this.form.getRawValue();

  console.log('VOU ENVIAR:', dados);

  this.service.enviar({
    nome: dados.nome!,
    email: dados.email!,
    mensagem: dados.mensagem!,
  }).subscribe({
    next: (resp) => {
      console.log('RESPOSTA DA API:', resp);

      this.sucesso = resp.mensagem;
      this.form.reset();
      this.enviando = false;
    },

    error: (err) => {
      console.error('ERRO DA API:', err);

      this.erro = 'Nao foi possivel enviar. Tente novamente.';
      this.enviando = false;
    },
  });
}
}