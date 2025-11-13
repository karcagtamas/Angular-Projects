export type Project = {
  name: string;
  description: string;
};

export type ResumeModel = {
  name: string;
  email: string;
  phone: string;
  address: string[];
  links: string[];
  languages: string[];
  aboutMe: string;
  skills: string[];
  experience: string[];
  education: string[];
  projects: Project[];
  courses: string[];
};
