import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsAdminComponent } from './albums-admin.component';

describe('AlbumsAdminComponent', () => {
  let component: AlbumsAdminComponent;
  let fixture: ComponentFixture<AlbumsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
