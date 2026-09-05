import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Projeto {
  id?: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link_github: string;
  ano: number;
  status: 'rascunho' | 'publicado';
}

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private http = inject(HttpClient);
  private url = 'https://legendary-waffle-x564v4grx9vwhp47x-8000.app.github.dev/api/projetos.php';

  listar(): Observable<Projeto[]> {
  return this.http.get<Projeto[]>(this.url);
}
  
  listarTodos(): Observable<Projeto[]> {
  return this.http.get<Projeto[]>(`${this.url}?todos=1`);
}
  
    // POST: o projeto vai inteiro no corpo. Sem id - quem gera o id e o banco.
criar(projeto: Projeto): Observable<{ id: number; mensagem: string }> {
  return this.http.post<{ id: number; mensagem: string }>(this.url, projeto);
}

// PUT: o id vai na URL (qual projeto) e o projeto vai no corpo (o que gravar)
atualizar(id: number, projeto: Projeto): Observable<{ id: number; mensagem?: string }> {
  return this.http.put<{ id: number; mensagem: string }>(`${this.url}?id=${id}`, projeto);
}

excluir(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}?id=${id}`);
}
// LACUNA 2 - escreva o metodo excluir(id: number): Observable<void>.
// Mesma URL com ?id= do atualizar, sem corpo, e o verbo delete.
}