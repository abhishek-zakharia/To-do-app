import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompoonentComponent } from './task-compoonent.component';

describe('TaskCompoonentComponent', () => {
  let component: TaskCompoonentComponent;
  let fixture: ComponentFixture<TaskCompoonentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCompoonentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCompoonentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
