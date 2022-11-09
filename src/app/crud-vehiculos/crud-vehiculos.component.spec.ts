import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudVehiculosComponent } from './crud-vehiculos.component';

describe('CrudVehiculosComponent', () => {
  let component: CrudVehiculosComponent;
  let fixture: ComponentFixture<CrudVehiculosComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
