export interface Board {
  id: number;
  title: string;
  default: boolean;
  totalImages: number;
  images: number[];
}

export interface BoardInside {
  general?: boolean;
  id: number | null;
  title: string;
  photos: Array<{
    id: number;
    note: null;
    photo: {
      id: number;
      image_url: string;
    };
  }>;
}

export interface BoardsState {
  fetchingCollection: boolean;
  collection: Record<string, Board>;
  ids: number[];
  board: BoardInside;
}

export interface ApiBoard {
  id: number;
  title: string;
  general: boolean;
}

export interface ApiBoardAdditional {
  id: number;
  photos_count: number;
  last_photo: {
    id: number;
    image_url: string;
  } | null;
}

export interface ApiBoardAdditionals {
  boards: ApiBoardAdditional[];
}

export interface ApiBoards {
  categories: ApiBoard[];
}

export interface AddImageToBoardParams {
  imageId: number;
  boardId?: number;
  boardTitle?: string;
  note?: string;
}

export interface AddImageToBoardSuccessPayload {
  imageId: number;
  boardId: number;
  note?: string;
}

export interface CreateBoardAndAddImagePayload {
  imageId: number;
  boardId: number;
  boardTitle: string;
  note?: string;
}
