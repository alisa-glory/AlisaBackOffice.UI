import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrainingDto } from 'src/app/models/training-dto';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-completion-editor',
  templateUrl: './completion-editor.component.html',
  styleUrls: ['./completion-editor.component.scss']
})
export class CompletionEditorComponent implements OnInit {

  editorForm = this.fb.group({
    id: [0],
    embeddedPrompt: [''],
    embeddedCompletion: [''],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public trainingData: TrainingDto,
    private dialogRef: MatDialogRef<CompletionEditorComponent>,
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.trainingData) {
      this.editorForm.controls['id'].setValue(this.trainingData.id);
      this.editorForm.controls['embeddedPrompt'].setValue(this.trainingData.embeddedPrompt ?? '');
      this.editorForm.controls['embeddedCompletion'].setValue(this.trainingData.embeddedCompletion ?? '');
    }    
  }

  ngAfterViewInit() {
    setTimeout(() => {
  
        var element = this.renderer.selectRootElement('#answer');
        element.focus();
  
    }, 1000);
  }
  saveCompletion() {
    if (this.editorForm.valid) {
      this.trainingService
        .updateCompletion(this.editorForm.value, this.trainingData.id)
        .subscribe({
          next: (res) => {
            console.log('Completion updated successfully.');
            this.editorForm.reset();
            this.dialogRef.close('update');
          },
          error: (err) => {
            console.log('Error while updationing the Completion.');
          },
        });
    }
  }
}
