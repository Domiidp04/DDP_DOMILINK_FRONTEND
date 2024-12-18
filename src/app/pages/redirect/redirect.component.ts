import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { LinkService } from '../../core/services/link.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit {

  public shortUrl: WritableSignal<string> = signal('');

  constructor(private linkService: LinkService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getPath();
  }

  public async redirect() {
    try {
      const response = await this.linkService.getOriginalUrl(this.shortUrl());

      if (response && response.originalUrl) {
        window.location.href = response.originalUrl;
      } else {
        console.error('No se encontró la URL original');
      }
    } catch (error) {
      console.error('Error al redirigir:', error);
    }

  }

  public getPath(): void{
    this.route.paramMap.subscribe(params => {
      this.shortUrl.set(params.get('shortUrl') || '');
      this.redirect();
    });
  }

}
