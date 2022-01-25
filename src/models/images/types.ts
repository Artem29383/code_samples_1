export interface Image {
  id: number;
  url: string;
  url470: string;
  width: number;
  position: number;
}

export interface ImagesState {
  collection: Record<string, Image>;
  ids: number[];
}
