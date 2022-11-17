import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarRevisionComponent } from './agendar-revision.component';

describe('AgendarRevisionComponent', () => {
  let component: AgendarRevisionComponent;
  let fixture: ComponentFixture<AgendarRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
