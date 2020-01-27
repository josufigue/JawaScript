import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaldeakPage } from './taldeak.page';

describe('TaldeakPage', () => {
  let component: TaldeakPage;
  let fixture: ComponentFixture<TaldeakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaldeakPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaldeakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
