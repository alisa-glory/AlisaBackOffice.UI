import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedListComponent } from './embed-list.component';

describe('EmbedListComponent', () => {
  let component: EmbedListComponent;
  let fixture: ComponentFixture<EmbedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
