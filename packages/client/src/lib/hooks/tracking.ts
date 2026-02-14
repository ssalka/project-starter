import is from '@sindresorhus/is';
import posthog from 'posthog-js';
import { useEffect, useRef } from 'react';

import { isProduction } from '@ssalka/common/config';

import { useGlobalSetting } from './settings';

export const useInitTracking = () => {
  const trackingEnabled = useGlobalSetting('trackingEnabled');
  const didInit = useRef(false);

  useEffect(() => {
    if (trackingEnabled && !didInit.current) {
      didInit.current = true;
      if (is.string(import.meta.env.VITE_POSTHOG_API_KEY)) {
        posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
          autocapture: false,
          api_host: 'https://us.i.posthog.com',
          person_profiles: 'always',
        });
      } else if (!isProduction) {
        // eslint-disable-next-line no-console
        console.warn('No PostHog API key found. Analytics are not being tracked');
      }
    }
  }, [trackingEnabled]);
};
