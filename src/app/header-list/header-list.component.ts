import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.scss']
})
export class HeaderListComponent {
  @Input() headers: Observable<any>;
}
