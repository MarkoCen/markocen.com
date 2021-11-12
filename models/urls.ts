export const base = 'https://www.markocen.com';

export const getPostPath = (postSlug: string, prependDomain?: boolean) => {
  const path = prependDomain ? `${base}` : ``;

  return `${path}/p/${postSlug}`;
};
