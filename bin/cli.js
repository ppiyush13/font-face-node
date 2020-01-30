import program from 'commander';
import {version} from '../package.json';
import fontface from '../src';

program
    .version(version, '-v, --version', 'font-face version')
    .description('Tool to generate font-face stylesheet')
    .action(() => {
        fontface();
    });

export function createCli(argv) {
    program.parse(process.argv);
}