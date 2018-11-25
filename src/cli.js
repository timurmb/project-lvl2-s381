import commander from 'commander';
import gendiff from '.';

export default () => commander
  .version('1.4.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = gendiff(firstConfig, secondConfig, commander.format);
    console.log(result);
  });
