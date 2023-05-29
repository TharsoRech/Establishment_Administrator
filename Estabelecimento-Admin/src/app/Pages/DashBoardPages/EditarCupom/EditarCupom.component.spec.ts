import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCupomComponent } from './EditarCupom.component';

describe('EditarCupomComponent', () => {
  let component: EditarCupomComponent;
  let fixture: ComponentFixture<EditarCupomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCupomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCupomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
