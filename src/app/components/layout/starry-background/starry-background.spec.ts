import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarryBackground } from './starry-background';

describe('StarryBackground', () => {
  let component: StarryBackground;
  let fixture: ComponentFixture<StarryBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarryBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarryBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
