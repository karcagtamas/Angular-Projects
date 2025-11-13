import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { PhotoService } from '../../services/photo.service';
import { ResumeDataService } from '../../services/resume-data.service';
import { Project } from '../../models/resume.model';

@Component({
  selector: 'app-resume',
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
})
export class Resume implements AfterViewInit, OnDestroy {
  private readonly pdfService = inject(PdfGeneratorService);
  private readonly photoService = inject(PhotoService);
  protected readonly resumeDataService = inject(ResumeDataService);

  protected resumeRef = viewChild.required<ElementRef<HTMLDivElement>>('resume');

  protected photoUrl = signal<string | ArrayBuffer | null>(null);

  private subs?: Subscription;

  ngAfterViewInit(): void {
    this.pdfService.setResumeElement(this.resumeRef());
    this.subs = this.photoService.photoUrl$.subscribe((url) => this.photoUrl.set(url));
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  protected isNotEmpty(str: string | null | undefined): boolean {
    return str !== null && str !== undefined && str.trim() !== '';
  }

  protected hasNonEmptyItems(array: string[]): boolean {
    return Array.isArray(array) && array.some((item) => item.trim().length >= 2);
  }

  protected hasNonEmptyProjects(array: Project[]): boolean {
    return (
      Array.isArray(array) &&
      array.some((item) => this.isNotEmpty(item.name) || this.isNotEmpty(item.description))
    );
  }
}
