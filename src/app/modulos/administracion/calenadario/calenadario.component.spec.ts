import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenadarioComponent } from './calenadario.component';

describe('CalenadarioComponent', () => {
  let component: CalenadarioComponent;
  let fixture: ComponentFixture<CalenadarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenadarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenadarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
