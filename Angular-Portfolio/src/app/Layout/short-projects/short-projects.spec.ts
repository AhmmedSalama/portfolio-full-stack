import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortProjects } from './short-projects';

describe('ShortProjects', () => {
  let component: ShortProjects;
  let fixture: ComponentFixture<ShortProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
