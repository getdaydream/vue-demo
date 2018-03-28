/**
 * pattern
 */
export const nicknamePattern = /^[\w\u4e00-\u9fa5]{2,15}$/;
export const emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

// TODO: refine
export const getQueryParams = (key) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
};
