import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Base } from "../base/base";

@Component({
  selector: 'app-home',
  imports: [Header, Base],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
