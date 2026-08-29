import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TecnologiaService, Tecnologia } from '../tecnologia.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  imports: [MatCardModule],
  templateUrl: './catalogo.html'
})
export class Catalogo implements OnInit {
  private service = inject(TecnologiaService);
  private cdr = inject(ChangeDetectorRef);

  tecnologias: Tecnologia[] = [];
  carregando = true;
  erro = '';

  ngOnInit() {
    this.service.listar().subscribe({
      next: (lista) => {
        this.tecnologias = lista;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Falha ao carregar o catalogo.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}