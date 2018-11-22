import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (format) => {
  if (parsers[format]) return parsers[format];
  return 'unknown format';
};
