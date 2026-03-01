import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioModelTs } from './portfolio.model.ts';

describe('PortfolioModelTs', () => {
  let component: PortfolioModelTs;
  let fixture: ComponentFixture<PortfolioModelTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioModelTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioModelTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
