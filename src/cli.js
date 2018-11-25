import commander from 'commander';
import gendiff from '.';

export default () => commander
  .version('1.4.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --formatin [type]', 'Input format')
  .option('--formatout [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = gendiff(firstConfig, secondConfig, commander.formatin, commander.formatout);
    console.log(result);
  });
