import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMycpmComponent } from './menu-mycpm.component';

describe('MenuMycpmComponent', () => {
  let component: MenuMycpmComponent;
  let fixture: ComponentFixture<MenuMycpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMycpmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMycpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
