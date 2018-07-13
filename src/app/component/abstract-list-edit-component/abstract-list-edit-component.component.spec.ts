import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractListEditComponentComponent } from './abstract-list-edit-component.component';

describe('AbstractListEditComponentComponent', () => {
  let component: AbstractListEditComponentComponent;
  let fixture: ComponentFixture<AbstractListEditComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractListEditComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractListEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
