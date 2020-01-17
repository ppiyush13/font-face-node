import fontface from '@font-face/core';
import chalk from 'chalk';
import {  cosmiconfigSync } from 'cosmiconfig';
import pkgDir from 'pkg-dir';
import {dirname, resolve} from 'path';
import NodeDirectoryContext from './nodeDirectoryContext';
import createResources from './createResources';

export default async () => {
    const explorerSync = cosmiconfigSync('font-face');
    const {config, filepath} = explorerSync.search();

    // find out app root of caller module
    const appRoot = pkgDir.sync(dirname(filepath));
    console.log(chalk.cyan('Found app root as '), chalk.green(appRoot));

    const {input, output, fonts} = config;
    const {dir: inputDir} = input;
    const {dir: outputDir, resourceDir, cssFileName} = output;

    const inputDirPath = resolve(appRoot, inputDir);
    const outputDirPath = resolve(appRoot, outputDir);
    const resourceDirPath = resolve(appRoot, resourceDir || resolve(outputDirPath, 'resources'));

    const cssContent = fontface({
        directoryContext: new NodeDirectoryContext({inputDirPath, outputDirPath, resourceDirPath}),
        fonts,
    });

    await createResources({
        inputDirPath, outputDirPath, resourceDirPath, cssFileName, cssContent, 
    });

    console.log(chalk.cyan('Done !!'));
}
