import { Suspense, createElement as el } from 'react'
import { createRoot } from 'react-dom/client';
import Root from './Root'

const ROOT_CONTAINER_ID = 'app'

const container = document.getElementById(ROOT_CONTAINER_ID);

const root = createRoot(container);

root.render(el(Suspense, { fallback: null },
  el(Root)
));

