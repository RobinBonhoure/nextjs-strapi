import type { Schema, Attribute } from '@strapi/strapi';

export interface SectionsCta extends Schema.Component {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'cta';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    paragraph: Attribute.RichText;
    image: Attribute.Media;
    button: Attribute.Component<'shared.button'>;
  };
}

export interface SectionsEstimateur extends Schema.Component {
  collectionName: 'components_sections_estimateurs';
  info: {
    displayName: 'estimateur';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    items: Attribute.Component<'shared.line-estimateur', true>;
  };
}

export interface SectionsEtapes extends Schema.Component {
  collectionName: 'components_blocks_etapes';
  info: {
    displayName: 'etapes';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    etapes: Attribute.Component<'shared.single-etape', true>;
    title: Attribute.String;
    subtitle: Attribute.String;
  };
}

export interface SectionsHeader extends Schema.Component {
  collectionName: 'components_sections_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    image: Attribute.Media;
    button: Attribute.Component<'shared.button'>;
  };
}

export interface SectionsImageText extends Schema.Component {
  collectionName: 'components_sections_image_texts';
  info: {
    displayName: 'imageText';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    paragraph: Attribute.RichText;
    image: Attribute.Media;
    reverse: Attribute.Boolean & Attribute.DefaultTo<false>;
    full: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SectionsRailText extends Schema.Component {
  collectionName: 'components_sections_rail_texts';
  info: {
    displayName: 'railText';
  };
  attributes: {
    text: Attribute.String;
    separator: Attribute.String;
  };
}

export interface SectionsText extends Schema.Component {
  collectionName: 'components_blocks_texts';
  info: {
    displayName: 'text';
    icon: 'book';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    paragraph: Attribute.RichText;
  };
}

export interface SectionsValeurs extends Schema.Component {
  collectionName: 'components_sections_valeurs';
  info: {
    displayName: 'valeurs';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    paragraph: Attribute.RichText;
    valeurs: Attribute.Component<'shared.valeur', true>;
  };
}

export interface SharedButton extends Schema.Component {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'button';
    icon: 'cube';
    description: '';
  };
  attributes: {
    link: Attribute.Component<'shared.link'>;
    type: Attribute.Enumeration<['primary', 'secondary']> &
      Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedItemEstimateur extends Schema.Component {
  collectionName: 'components_shared_item_estimateurs';
  info: {
    displayName: 'itemEstimateur';
    icon: 'puzzle';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    price: Attribute.Integer;
    description: Attribute.RichText;
    inclus: Attribute.Boolean & Attribute.DefaultTo<false>;
    abonnement: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SharedLineEstimateur extends Schema.Component {
  collectionName: 'components_shared_line_estimateurs';
  info: {
    displayName: 'lineEstimateur';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    items: Attribute.Component<'shared.item-estimateur', true>;
  };
}

export interface SharedLink extends Schema.Component {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
    icon: 'link';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    href: Attribute.String;
    isExternal: Attribute.Boolean;
  };
}

export interface SharedMenu extends Schema.Component {
  collectionName: 'components_shared_menus';
  info: {
    displayName: 'Menu';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String;
    page: Attribute.Relation<'shared.menu', 'oneToOne', 'api::page.page'>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'write';
  };
  attributes: {
    metadescription: Attribute.String;
    metatitle: Attribute.String;
  };
}

export interface SharedSingleEtape extends Schema.Component {
  collectionName: 'components_shared_single_etapes';
  info: {
    displayName: 'etape';
    icon: 'stack';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    paragraph: Attribute.Text;
    image: Attribute.Media;
  };
}

export interface SharedValeur extends Schema.Component {
  collectionName: 'components_shared_valeurs';
  info: {
    displayName: 'valeur';
  };
  attributes: {
    title: Attribute.String;
    paragraph: Attribute.RichText;
    image: Attribute.Media;
  };
}

export interface SocialMediaYoutube extends Schema.Component {
  collectionName: 'components_social_media_youtubes';
  info: {
    displayName: 'LinksRs';
    icon: 'manyWays';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    type: Attribute.Enumeration<
      ['facebook', 'instagram', 'linkedin', 'youtube', 'tiktok']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'sections.cta': SectionsCta;
      'sections.estimateur': SectionsEstimateur;
      'sections.etapes': SectionsEtapes;
      'sections.header': SectionsHeader;
      'sections.image-text': SectionsImageText;
      'sections.rail-text': SectionsRailText;
      'sections.text': SectionsText;
      'sections.valeurs': SectionsValeurs;
      'shared.button': SharedButton;
      'shared.item-estimateur': SharedItemEstimateur;
      'shared.line-estimateur': SharedLineEstimateur;
      'shared.link': SharedLink;
      'shared.menu': SharedMenu;
      'shared.seo': SharedSeo;
      'shared.single-etape': SharedSingleEtape;
      'shared.valeur': SharedValeur;
      'social-media.youtube': SocialMediaYoutube;
    }
  }
}
