import { Injectable } from '@angular/core';
import { Project, ResumeModel } from '../models/resume.model';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  private resume: ResumeModel;

  constructor() {
    this.resume = {
      name: '',
      email: '',
      phone: '',
      address: ['', '', '', ''],
      links: ['', '', '', ''],
      languages: ['', '', '', ''],
      aboutMe: '',
      skills: ['', '', '', ''],
      experience: ['', '', '', ''],
      education: ['', '', '', ''],
      projects: [
        { name: '', description: '' },
        { name: '', description: '' },
        { name: '', description: '' },
      ],
      courses: ['', '', '', ''],
    } as ResumeModel;
  }

  getResume(): ResumeModel {
    return this.resume;
  }

  get name(): string {
    return this.resume.name;
  }

  set name(name: string) {
    this.resume.name = name;
  }

  get email(): string {
    return this.resume.email;
  }

  set email(email: string) {
    this.resume.email = email;
  }

  get phone(): string {
    return this.resume.phone;
  }

  set phone(phone: string) {
    this.resume.phone = phone;
  }

  get address(): string[] {
    return this.resume.address;
  }

  set address(address: string[]) {
    this.resume.address = address;
  }

  get links(): string[] {
    return this.resume.links;
  }

  set links(links: string[]) {
    this.resume.links = links;
  }

  get languages(): string[] {
    return this.resume.languages;
  }

  set languages(languages: string[]) {
    this.resume.languages = languages;
  }

  get aboutMe(): string {
    return this.resume.aboutMe;
  }

  set aboutMe(aboutMe: string) {
    this.resume.aboutMe = aboutMe;
  }

  get skills(): string[] {
    return this.resume.skills;
  }

  set skills(skills: string[]) {
    this.resume.skills = skills;
  }

  get experience(): string[] {
    return this.resume.experience;
  }

  set experience(experience: string[]) {
    this.resume.experience = experience;
  }

  get education(): string[] {
    return this.resume.education;
  }

  set education(education: string[]) {
    this.resume.education = education;
  }

  get projects(): Project[] {
    return this.resume.projects;
  }

  set projects(projects: Project[]) {
    this.resume.projects = projects;
  }

  get courses(): string[] {
    return this.resume.courses;
  }

  set courses(courses: string[]) {
    this.resume.courses = courses;
  }
}
