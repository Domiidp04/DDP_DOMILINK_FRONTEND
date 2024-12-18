import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LinkService } from '../../../core/services/link.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor(private linkService: LinkService, private router: Router) { }

  @Input() public originalUrl: string;
  @Input() public shortUrl: string;

  public redirect(): void{
    this.router.navigate([`/${this.shortUrl}`])
  }

}
