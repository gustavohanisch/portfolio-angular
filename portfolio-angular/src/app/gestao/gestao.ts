import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjetoService, Projeto } from '../projeto.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestao',
  imports: [ReactiveFormsModule],
  templateUrl: './gestao.html',
  styleUrl: './gestao.css'
})
export class Gestao implements OnInit {
  private service = inject(ProjetoService);
  private cdr = inject(ChangeDetectorRef);

  // A lista que a tela mostra, e os estados dela (mesmo padrao da Aula 17)
  projetos: Projeto[] = [];
  carregando = true;
  erro = '';

  // Quando editandoId tem um numero, o formulario esta em modo EDICAO.
  // Quando esta null, o mesmo formulario esta em modo ADICAO.
  editandoId: number | null = null;
  salvando = false;

  // O formulario vive aqui no .ts, como na Aula 18.
  // ano e obrigatorio porque a coluna do banco e YEAR NOT NULL.
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descricao: new FormControl(''),
    tecnologias: new FormControl(''),
    link_github: new FormControl(''),
    ano: new FormControl(2026, [Validators.required, Validators.min(1900), Validators.max(2100)]),
    status: new FormControl<'rascunho' | 'publicado'>('publicado', {nonNullable: true })
});

ngOnInit() {
  this.carregar();
}

carregar() {
  this.carregando = true;
  this.service.listarTodos().subscribe({
    next: (lista) => { this.projetos = lista; this.carregando = false; this.cdr.detectChanges(); },
    error: () => { this.erro = 'Nao foi possivel carregar os projetos.'; this.carregando = false; this.cdr.detectChanges(); }
  });
}

// Editar nao busca nada na API: o projeto ja veio na lista.
// patchValue joga os campos dele para dentro do formulario.
editar(p: Projeto) {
  this.editandoId = p.id ?? null;
  this.form.patchValue(p);
}

salvar() {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  this.salvando = true;
  this.erro = '';
  const dados = this.form.value as Projeto;

  // ESTA linha decide tudo: com id, e PUT; sem id, e POST.
  // Um formulario, dois usos.
  const requisicao = this.editandoId
      ? this.service.atualizar(this.editandoId, dados)
    : this.service.criar(dados);

    requisicao.subscribe({
      next: () => {   this.salvando = false; this.editandoId = null; this.form.reset({ nome: '', descricao: '', tecnologias: '', link_github: '', ano: 2026, status: 'publicado' }); this.carregar(); },
      error: () => { this.salvando = false; this.erro = 'Nao foi possivel salvar.'; this.cdr.detectChanges(); }
    });
  }

  excluir(p: Projeto) {
    if (!p.id) { return; }
    if (!confirm(`Excluir o projeto "${p.nome}"? Esta acao nao pode ser desfeita.`)) { return; }
      

    this.service.excluir(p.id).subscribe({
      // A lista local perde o item na hora - sem recarregar a pagina.
      next: () => { this.projetos = this.projetos.filter(x => x.id !== p.id); },
      error: () => { this.erro = 'Nao foi possivel excluir. Tente de novo.' }
    });
  }
}
