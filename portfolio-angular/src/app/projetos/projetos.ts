import { MatButtonModule } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { ProjetoService } from '../projeto.service';
import { map, startWith, catchError, of } from 'rxjs';

@Component({
  selector: 'app-projetos',
  imports: [MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './projetos.html'
})
export class Projetos {

  private service = inject(ProjetoService);

  estado$ = this.service.listar().pipe(

    map(projetos => ({
      carregando: false,
      erro: '',
      projetos
    })),

    startWith({
      carregando: true,
      erro: '',
      projetos: []
    }),

    catchError(() =>
      of({
        carregando: false,
        erro: 'Falha ao carregar os projetos.',
        projetos: []
      })
    )

  );

}