import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeDataService } from '../../services/resume-data.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-editable-resume',
  imports: [CommonModule, FormsModule],
  templateUrl: './editable-resume.html',
  styleUrl: './editable-resume.scss',
})
export class EditableResume {
  private readonly photoService = inject(PhotoService);
  protected readonly resumeDataService = inject(ResumeDataService);

  protected photoUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoUrl = reader.result;
      this.photoService.photoUrl = this.photoUrl;
    };
    reader.readAsDataURL(file);
  }
}
