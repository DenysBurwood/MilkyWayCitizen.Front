import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsIndexPage } from './news-index-page';

describe('NewsIndexPage', () => {
  let component: NewsIndexPage;
  let fixture: ComponentFixture<NewsIndexPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsIndexPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
