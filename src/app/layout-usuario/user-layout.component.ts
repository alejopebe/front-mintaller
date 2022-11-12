import { Component, OnInit } from '@angular/core';
import { throwNzModalContentAlreadyAttachedError } from 'ng-zorro-antd/modal';
import { RequestBackendService } from '../request-backend.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  isCollapsed = false;

  constructor(private requestBack: RequestBackendService) { }

  ngOnInit(): void {

  }

}
