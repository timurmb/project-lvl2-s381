import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (format) => {
  if (!parsers[format]) throw new Error('unknown format');
  return parsers[format];
};
