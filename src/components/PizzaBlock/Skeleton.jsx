import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="117" r="114" />
    <rect x="6" y="259" rx="10" ry="10" width="262" height="28" />
    <rect x="6" y="312" rx="10" ry="10" width="266" height="88" />
    <rect x="6" y="429" rx="10" ry="10" width="95" height="30" />
    <rect x="121" y="421" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
