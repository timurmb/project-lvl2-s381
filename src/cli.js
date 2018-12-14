import commander from 'commander';
import pack from '../package';
import gendiff from '.';

export default () => commander
  .version(pack.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = gendiff(firstConfig, secondConfig, commander.format);
    console.log(result);
  })
  .parse(process.argv);
