"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
  image: {
    populate: '*',
  },
  seo: {
    populate: '*',
  },
  button: {
    populate: '*',
  },
  components: {
    populate: {
      image: {
        populate: '*',
      },
      etapes: {
        populate: '*',
      },
      valeurs: {
        populate: '*',
      },
      button: {
        populate: '*',
      },
      items: {
        populate: '*',
      },
    },
  }
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

    await next();
  };
};
