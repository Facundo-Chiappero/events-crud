export type User = {
  id: number;
  email: string;
  password: string;
  role: ROLES;
};

export enum REDUCER_ACTIONS{
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
  SET_EVENTS = 'SET_EVENTS',
  SET_FORM_DATA = 'SET_FORM_DATA',
  SET_SHOW_MODAL = 'SET_SHOW_MODAL',
  SET_SHOW_CREATE_MODAL = 'SET_SHOW_CREATE_MODAL',
  SET_SHOW_DELETE_MODAL = 'SET_SHOW_DELETE_MODAL',
  SET_SELECTED_EVENT = 'SET_SELECTED_EVENT',
  SET_EVENT_TO_DELETE = 'SET_EVENT_TO_DELETE',
  SET_EVENT_TO_PURCHASE = 'SET_EVENT_TO_PURCHASE',
  SET_SHOW_PURCHASE_MODAL = 'SET_SHOW_PURCHASE_MODAL',
}

export enum ACTIONS {
  SIGNUP = 'signUp',
  LOGIN = 'logIn',
  GET_USERS = 'getUser',
}

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface EventType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  date: string;
}
