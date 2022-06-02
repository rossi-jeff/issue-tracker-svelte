import { writable } from 'svelte/store';

export const initialStores = {
  session: {
    signedIn: false,
    Name: '',
    UserName: '',
    Token: '',
    UUID: '',
    SessionId: ''
  },
  flash: {
    visible: false,
	  className: '',
	  message: ''
  },
}

/** @type {{ text: string; href?: string; }[]} */
let trail = [];

export const sessionKey = 'issue-tracker-svelte-session';

export const session = writable(initialStores.session);

export const flash = writable(initialStores.flash);

export const crumbs = writable(trail);
