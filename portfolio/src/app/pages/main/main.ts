import { Component } from '@angular/core';
import { Introduction } from '../introduction/introduction';
import { AboutMe } from '../about-me/about-me';
import { Portfolio } from '../portfolio/portfolio';
import { Services } from '../services/services';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-main',
  imports: [Introduction, AboutMe, Portfolio, Services, Contact],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
