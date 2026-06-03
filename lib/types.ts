export interface HomeStat {
  value: string;
  label: string;
}

export interface HomeContent {
  roleBadge: string;
  headline: string;
  subheading: {
    base: string;
    accent: string;
  };
  bio: string;
  stats: HomeStat[];
}

export interface SuggestionChips {
  home: string[];
  chat: string[];
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  phone: string;
  availability: {
    show: boolean;
    message: string;
  };
}
