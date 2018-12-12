import commander from 'commander';
import fs from 'fs';
import gendiff from '.';

export default () => commander
  .version(JSON.parse(fs.readFileSync('package.json', 'utf8')).version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = gendiff(firstConfig, secondConfig, commander.format);
    console.log(result);
  });
