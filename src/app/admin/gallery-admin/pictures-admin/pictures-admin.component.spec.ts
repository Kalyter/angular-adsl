import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesAdminComponent } from './pictures-admin.component';

describe('PicturesAdminComponent', () => {
  let component: PicturesAdminComponent;
  let fixture: ComponentFixture<PicturesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
