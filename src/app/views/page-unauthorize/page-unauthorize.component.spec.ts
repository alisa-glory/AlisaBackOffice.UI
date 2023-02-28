import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnauthorizeComponent } from './page-unauthorize.component';

describe('PageUnauthorizeComponent', () => {
  let component: PageUnauthorizeComponent;
  let fixture: ComponentFixture<PageUnauthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUnauthorizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUnauthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
