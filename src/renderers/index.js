import renderStandart from './renderStandart';
import renderPlain from './renderPlain';
import renderJSON from './renderJSON';

const renderers = {
  standart: renderStandart,
  plain: renderPlain,
  json: renderJSON,
};

export default (format) => {
  if (!renderers[format]) throw new Error('unknown rendering format');
  return renderers[format];
};
