// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
    return localStorage.getItem('os-console-token') || '';
  }
  
  export function setAuthority(authority) {
    return localStorage.setItem('os-console-token', typeof authority === 'string' ? authority : JSON.stringify(authority));
  }
  