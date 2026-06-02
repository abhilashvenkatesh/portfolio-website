export interface Contact {
  email: string;
  linkedin: string;
  phone: string;
  availability: {
    show: boolean;
    message: string;
  };
}
