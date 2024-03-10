export interface Entity {
  id: string;
}

export const trackByID = (m: Entity) => m.id;

export interface NamedEntity extends Entity {
  name: string;
}
