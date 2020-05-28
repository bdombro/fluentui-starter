import React from 'react';
import useMetaTags from 'react-metatags-hook'

export default function NoMatch({route}) {
  useMetaTags({
    title: route.name,
    description: route.description,
    metas: [
      { name: 'keywords', content: 'a, list, of, keywords' },
      { name: 'robots', content: 'index, follow' },
      { name: 'DC.Title', content: route.name },
      { name: 'url', content: window.location.href },
    ],
    links: [
      { rel: 'canonical', href: window.location.href },
    ],
    openGraph: {
      title: route.name,
      image: 'http://yourwebsite.com/ogimage.jpg',
    },
    twitter: {
      card: 'summary',
      creator: '@you',
      title: route.name,
    }
  }, [route.path]);

  return (
    <div>
      <h3>Coming soon.</h3>
      <p>
        The requested page <code>{route.path}</code> is coming soon.
      </p>
    </div>
  );
}
