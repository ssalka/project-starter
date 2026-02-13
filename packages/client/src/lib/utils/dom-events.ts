import type { SyntheticEvent } from 'react';

export const stopPropagation = <E extends SyntheticEvent>(event: E) => event.stopPropagation();

export const preventDefault = <E extends SyntheticEvent>(event: E) => event.preventDefault();

export const killEvent = <E extends SyntheticEvent>(event: E) => {
  event.preventDefault();
  event.stopPropagation();
};
