import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LicenceMasterComponent } from './licence-master.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { LicenceState } from '../model/state-model';

describe('LicenceMasterComponent', () => {
  let component: LicenceMasterComponent;
  let fixture: ComponentFixture<LicenceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxsModule.forRoot([LicenceState], {
        developmentMode: true
      })],
      declarations: [ LicenceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
