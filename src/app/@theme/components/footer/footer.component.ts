import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by <b><a href="https://ohincapie.github.io/Portafolio-web/" target="_blank">Oscar Hincapie</a></b> 2022
    </span>
    <div class="socials">
      <a href="https://github.com/OHincapie" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/oscar-hincapie/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
