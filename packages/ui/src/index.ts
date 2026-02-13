// NOTE It is not recommended to use this main file because it prevents tree-shaking of components.
// Instead, import components directly from their source files, eg:
//
// ```tsx
// import { Button } from '@ssalka/ui/components/button';
// ```

import './tailwind.css';

export * from './styles/colors';
export * from './styles/typography';
export * from './utils';
