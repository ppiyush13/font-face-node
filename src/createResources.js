import cpy from 'cpy';
import makeDir from 'make-dir';
import write from 'write';
import {join} from 'path';
import chalk from 'chalk';

export default async ({inputDirPath, outputDirPath, resourceDirPath, cssFileName, cssContent}) => {
    await makeDir(resourceDirPath);

    const inputDirPathGlob = join(inputDirPath, '**');
    await cpy(inputDirPathGlob, resourceDirPath);

    console.log(
        chalk.cyan('Created '), 
        chalk.green(cssFileName), 
        chalk.cyan('in'),
        chalk.green(outputDirPath), 
    );

    const cssFilePath = join(outputDirPath, cssFileName);
    await write(cssFilePath, cssContent);

    console.log(
        chalk.cyan('Copied fonts to'),
        chalk.green(resourceDirPath),
    );
}