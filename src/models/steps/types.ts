export type InitialState = {
  unregistered: boolean;
  requestId: string | null;
  load: boolean;
  step: number;
  data: {
    address: string;
    timeline?: string;
    selling_reasons?: string[];
    want_buy_new_property?: boolean;
    bathrooms_total?: number;
    bedrooms_total?: number;
    living_area_total_square_feet?: number;
    year_built?: number;
    features?: string[];
    problems?: string[];
    remodeled_items?: string[];
    photos?: { id: number; image_url: string }[];
    already_work_with_agent: boolean;
    has_lender: boolean;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    unregistered_user_identy_token: string;
  };
};
