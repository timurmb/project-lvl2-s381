import renderStandart from './renderStandart';
import renderPlain from './renderPlain';
import renderJSON from './renderJSON';

const renderers = {
  standart: renderStandart,
  plain: renderPlain,
  json: renderJSON,
};

export default (format) => {
  console.log(format);
  if (!renderers[format]) throw new Error(`unknown rendering format - ${format}`);
  return renderers[format];
};
