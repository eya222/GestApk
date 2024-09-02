import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() appName: string='';
  @Input() appDescription: string='';
  @Input() appDemo: File|null=null;
  @Input() id:string='';
  @Input() nomClient:string='';

  constructor(private router: Router) {}
  detail() {
    
    this.router.navigate([`/detail/${this.id}`]);
    
  }

}
