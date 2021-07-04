import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProdComponent } from './details-prod.component';

describe('DetailsProdComponent', () => {
  let component: DetailsProdComponent;
  let fixture: ComponentFixture<DetailsProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
