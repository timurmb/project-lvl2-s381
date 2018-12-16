import renderStandart from './renderers/renderStandart';
import renderPlain from './renderers/renderPlain';

const renderers = {
  standart: renderStandart,
  plain: renderPlain,
};

export default (format) => {
  if (!renderers[format]) throw new Error('unknown rendering format');
  return renderers[format];
};
