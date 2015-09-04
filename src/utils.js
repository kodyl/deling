import fs from 'fs';

export const exists = fs.existsSync;

function isObject (obj) {
  return ( typeof obj === 'object' && !Array.isArray(obj) );
}

// Deep assign
export function assign (target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).reduce((target, key) => {
      if (!target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
      else {
        target[key] = isObject(source[key]) ? assign(target[key], source[key]) : source[key];
      }
      return target;
    }, target);
  }

  return target;
}
