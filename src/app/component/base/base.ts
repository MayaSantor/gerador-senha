import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base',
  standalone: true,  
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './base.html',
  styleUrl: './base.scss'
})
export class Base {
  tamanhoSenha: number = 15;
  incluirMaiuscula: boolean = false;
  incluirMinuscula: boolean = false;
  incluirNumeros: boolean = false;
  incluirEspeciais: boolean = false;

  senhaGerada: string = '';
  mostrarSenha = false;
  popupAtivo = false;
  popupMensagem = '';

  atualizarTamanhoSenha(event: any) {
    this.tamanhoSenha = event.target.value;
  }

  gerarSenha() {
    const tipos = this.getTiposCaracteres();

    if (tipos.length === 0) {
      this.mostrarPopup('Selecione pelo menos um tipo de caractere.');
      return;
    }

    let senha = '';
    for (let i = 0; i < this.tamanhoSenha; i++) {
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];
      senha += tipo.charAt(Math.floor(Math.random() * tipo.length));
    }

    this.senhaGerada = senha;
    this.mostrarSenha = true;
  }

  getTiposCaracteres(): string[] {
    const tipos = [];
    if (this.incluirMaiuscula) tipos.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (this.incluirMinuscula) tipos.push('abcdefghijklmnopqrstuvwxyz');
    if (this.incluirNumeros) tipos.push('0123456789');
    if (this.incluirEspeciais) tipos.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    return tipos;
  }

  copiarSenha() {
    navigator.clipboard.writeText(this.senhaGerada);
    this.mostrarPopup('Senha copiada com sucesso!');
  }

  mostrarPopup(msg: string) {
    this.popupMensagem = msg;
    this.popupAtivo = true;
  }

  fecharPopup() {
    this.popupAtivo = false;
  }

}
