import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AddComponent } from '../../shared/components/add/add.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { LinkService } from '../../core/services/link.service';
import { LinkResponse } from '../../core/models/linkResponse.model';
import { LinkEventService } from '../../shared/pipes/link-event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    AddComponent,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public links: LinkResponse[];
  public id: number = 0;

  constructor(private linkService: LinkService, private linkEventService: LinkEventService) {
    this.id = Number(localStorage.getItem('id'))
  }

  ngOnInit(): void {
    this.initData();
    this.linkEventService.linkAdded$.subscribe(() => {
      this.initData();
    });
  }

  public async initData(): Promise<LinkResponse[]> {
    return this.links = await this.linkService.getLinks(this.id);
  }

}
