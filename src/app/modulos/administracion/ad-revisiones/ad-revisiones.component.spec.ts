import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdRevisionesComponent } from './ad-revisiones.component';

describe('AdRevisionesComponent', () => {
  let component: AdRevisionesComponent;
  let fixture: ComponentFixture<AdRevisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdRevisionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
