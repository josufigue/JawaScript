import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaldeaComponent } from './taldea.component';

describe('TaldeaComponent', () => {
  let component: TaldeaComponent;
  let fixture: ComponentFixture<TaldeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaldeaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaldeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
