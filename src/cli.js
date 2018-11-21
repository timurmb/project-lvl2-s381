import commander from 'commander';
import gendiff from '.';

export default () => commander
  .version('1.1.5')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = gendiff(firstConfig, secondConfig);
    console.log(result);
  });
