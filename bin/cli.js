import program from 'commander';
import {version} from '../package.json';
import fontface from '../src';

program
    .version(version, '-v, --version', 'qubix version')
    .description('Create micro-frontend bundle with a breeze')
    .action(() => {
        fontface();
    });

export function createCli(argv) {
    program.parse(process.argv);
}