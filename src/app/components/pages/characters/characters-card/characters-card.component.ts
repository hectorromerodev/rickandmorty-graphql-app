import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Character } from '@app/shared/interfaces/data.interface';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character!: Character;
  constructor(
    private localStgServ: LocalStorageService
  ) { }
  getIcon(): string {
    return this.character?.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }

  toggleFavorite(): void {
    const isFavorite = !!this.character?.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStgServ.addOrRemoveFavorite(this.character);
  }

}
