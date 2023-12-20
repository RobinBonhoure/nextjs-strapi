/**
 * `navigation` middleware
 */

import { Strapi } from '@strapi/strapi';

const populate = {
  logo: {
    fields : ["width", "height", "url", "name", "alternativeText"],
  },
  links: {
    populate: {
      page: {
        fields : ["slug"],
      },
    },
  }
};

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {

    ctx.query = {
      populate,
    };

    await next();
  };
};
