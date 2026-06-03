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
