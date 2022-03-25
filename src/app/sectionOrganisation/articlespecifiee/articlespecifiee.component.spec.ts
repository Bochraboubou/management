import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlespecifieeComponent } from './articlespecifiee.component';

describe('ArticlespecifieeComponent', () => {
  let component: ArticlespecifieeComponent;
  let fixture: ComponentFixture<ArticlespecifieeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlespecifieeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlespecifieeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
