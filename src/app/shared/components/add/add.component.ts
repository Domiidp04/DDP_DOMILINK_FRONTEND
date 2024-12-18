import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LinkService } from '../../../core/services/link.service';
import { LinkEventService } from '../../pipes/link-event.service';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {

  public formAdd: FormGroup;
  public clientId: number = 0;

  constructor(private linkService: LinkService, private linkEventService: LinkEventService) {
    this.clientId = Number(localStorage.getItem('id'));
  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.formAdd = new FormGroup({
      originalUrl: new FormControl(''),
    });
  }


  public async addLink(): Promise<void> {
    try {
      await this.linkService.createShortLink(this.clientId, this.formAdd.get('originalUrl').value);
      this.linkEventService.notifyLinkAdded();
      this.visible = false;
      this.formAdd.reset();
    } catch (error) {
      console.error('Error al crear el enlace:', error);
    }
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

}
