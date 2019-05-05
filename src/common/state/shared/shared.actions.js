export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';

export function StartLoaderAction () {
  return {
    type: LOADING_START
  };
}

export function StopLoaderAction () {
  return {
    type: LOADING_DONE
  };
}
