import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmerchComponent } from './newmerch.component';

describe('NewmerchComponent', () => {
  let component: NewmerchComponent;
  let fixture: ComponentFixture<NewmerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewmerchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewmerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
