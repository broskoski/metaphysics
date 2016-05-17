import gravity from '../../lib/loaders/gravity';
import delta from '../../lib/loaders/delta';
import { sortBy, first, omit } from 'lodash';
import blacklist from '../../lib/artist_blacklist';

export const featuredFair = () => {
  return gravity('fairs', { size: 5, active: true }).then((fairs) => {
    if (fairs.length) {
      return first(sortBy(fairs, ({ banner_size }) =>
        ['x-large', 'large', 'medium', 'small', 'x-small'].indexOf(banner_size)
      ));
    }
  });
};

export const featuredAuction = () => {
  return gravity('sales', { live: true, size: 1 }).then((sales) => {
    if (sales.length) {
      return first(sales);
    }
  });
};

export const featuredGene = (accessToken) => {
  return gravity.with(accessToken)('me/follow/genes', { size: 1 }).then((follows) => {
    if (follows.length) {
      return first(follows).gene;
    }
  });
};

export const iconicArtists = () => {
  return delta('/', {
    method: 'fetch',
    n: 9,
    name: 'artist_search_2t',
  }).then((trending) => {
    return omit(trending, blacklist);
  });
};
