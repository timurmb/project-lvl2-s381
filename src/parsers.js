import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (format) => {
  if (!parsers[format]) throw new Error('unknown format');
  return parsers[format];
};
