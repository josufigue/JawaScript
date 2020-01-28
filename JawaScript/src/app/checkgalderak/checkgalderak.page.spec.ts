import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckgalderakPage } from './checkgalderak.page';

describe('CheckgalderakPage', () => {
  let component: CheckgalderakPage;
  let fixture: ComponentFixture<CheckgalderakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckgalderakPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckgalderakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
