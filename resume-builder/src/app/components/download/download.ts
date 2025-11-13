import { Component, inject } from '@angular/core';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-download',
  imports: [],
  templateUrl: './download.html',
  styleUrl: './download.scss',
})
export class Download {
  private readonly pdfGeneratorService = inject(PdfGeneratorService);

  protected generate(): void {
    this.pdfGeneratorService.generateResume();
  }
}
