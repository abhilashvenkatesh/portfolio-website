export interface HomeContent {
  roleBadge: string;
  headline: string;
  subheading: {
    base: string;
    accent: string;
  };
  bio: string;
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
