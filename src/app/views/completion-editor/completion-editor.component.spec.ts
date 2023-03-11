import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionEditorComponent } from './completion-editor.component';

describe('CompletionEditorComponent', () => {
  let component: CompletionEditorComponent;
  let fixture: ComponentFixture<CompletionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
