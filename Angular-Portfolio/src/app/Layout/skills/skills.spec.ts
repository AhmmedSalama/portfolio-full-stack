import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SKILLS } from './skills';

describe('SKILLS', () => {
  let component: SKILLS;
  let fixture: ComponentFixture<SKILLS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SKILLS]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SKILLS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
