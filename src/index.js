import fs from 'fs';
import path from 'path';
import selectParser from './parsers';
import selectRenderer from './renderers';
import buildAST from './AST';

const normalize = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
};

const define = (path1, path2) => {
  const format1 = path.extname(path1).substr(1);
  const format2 = path.extname(path2).substr(1);
  if (format1 !== format2 || format1 === '' || format2 === '') throw new Error('unknown input format');
  return format1;
};

function gendiff(path1, path2, outputFormat = 'standart') {
  const path1Normalized = normalize(path1);
  const path2Normalized = normalize(path2);

  const str1 = fs.readFileSync(path1Normalized, 'utf8');
  const str2 = fs.readFileSync(path2Normalized, 'utf8');

  const inputFormat = define(path1Normalized, path2Normalized);
  const parse = selectParser(inputFormat);
  const obj1 = parse(str1);
  const obj2 = parse(str2);

  const render = selectRenderer(outputFormat);
  const result = render(buildAST(obj1, obj2));
  return result;
}

export default gendiff;
