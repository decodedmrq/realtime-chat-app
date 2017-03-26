/**
 * Created by mon.ls on 12/2/2016.
 */
export function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Byte';
  let k = 1024; // or 1024 for binary
  let dm = decimals + 1 || 3;
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
export function getFileExtension(filename) {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
}
export function inArray(needle, haystack) {
  let length = haystack.length;
  for (let i = 0; i < length; i++) {
    if (haystack[i] === needle) return true;
  }
  return false;
}
export function clean(obj) {
  let propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    let propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined ||  obj[propName] === '') {
      delete obj[propName];
    }
  }
}
