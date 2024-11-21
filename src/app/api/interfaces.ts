export interface Book {
  id: string;
  title: string;
  author: string;
  createdDate: Date;
  description?: string;
  avatar_url?: string;
}

export interface ErrorSettings {
  get: boolean;
  delete: boolean;
  post: boolean;
  put: boolean;
}

export enum ErrorSettingsEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}
