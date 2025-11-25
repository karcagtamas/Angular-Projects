import { Component } from '@angular/core';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-contact',
  imports: [Button],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected phoneNumber = '+1 923 673 131';
  protected email = 'adam.placeholder@gmail.com';

  protected sendData(): void {
    console.log('Sends data to its place');
  }
}
