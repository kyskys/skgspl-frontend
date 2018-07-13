import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractListEditComponent } from './abstract-list-edit.component';

describe('AbstractListEditComponentComponent', () => {
  let component: AbstractListEditComponent;
  let fixture: ComponentFixture<AbstractListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
