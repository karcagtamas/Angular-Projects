import { Component } from '@angular/core';
import { EditableResume } from './components/editable-resume/editable-resume';
import { Resume } from './components/resume/resume';
import { Download } from './components/download/download';

@Component({
  selector: 'app-root',
  imports: [EditableResume, Resume, Download],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
