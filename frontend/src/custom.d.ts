declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.svg';

declare const require: {
  context: (path: string, deep?: boolean, filter?: RegExp) => {
    keys: () => string[];
    <T>(id: string): T;
  };
};
