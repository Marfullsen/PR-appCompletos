import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { addIcons } from 'ionicons';
import { storefrontOutline, happyOutline, cartOutline, fastFoodOutline, menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]  // Asegúrate de incluir FormsModule aquí
})
export class PerfilPage implements OnInit {
  profileImage: string | ArrayBuffer | null = null;
  puntosAcumulados: number = 0;
  nombreUsuario: string = '';
  correoElectronico: string = '';
  direccion: string = ''; // Nueva propiedad para la dirección

  constructor() {
    addIcons({ storefrontOutline, cartOutline, happyOutline, menuOutline, fastFoodOutline });
  }

  ngOnInit() {
    this.cargarPuntos();
    this.cargarDatosUsuario();
    this.cargarDireccion(); // Carga la dirección al iniciar el componente
  }

  cargarPuntos() {
    const puntos = localStorage.getItem('puntosAcumulados');
    this.puntosAcumulados = puntos ? parseFloat(puntos) : 0;
  }

  cargarDatosUsuario() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.correoElectronico = localStorage.getItem('correoElectronico') || '';
  }

  cargarDireccion() {
    this.direccion = localStorage.getItem('direccion') || ''; // Carga la dirección del localStorage
  }

  guardarNombreUsuario() {
    localStorage.setItem('nombreUsuario', this.nombreUsuario);
  }

  guardarCorreoElectronico() {
    localStorage.setItem('correoElectronico', this.correoElectronico);
  }

  guardarDireccion() {
    localStorage.setItem('direccion', this.direccion); // Guarda la dirección en el localStorage
  }

  selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
}
