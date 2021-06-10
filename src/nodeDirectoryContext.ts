import pathExists from 'path-exists';
import {resolve} from 'path';
import relative from 'relative-cjs';

export default function NodeDirectoryContext({inputDirPath, outputDirPath, resourceDirPath}: { inputDirPath: string, outputDirPath: string, resourceDirPath: string } ) {
    this.inputDirPath = inputDirPath;
    this.outputDirPath = outputDirPath;
    this.resourceDirPath = resourceDirPath;
}

NodeDirectoryContext.prototype.exists = function(fileName: string) {
    return pathExists.sync(
        resolve(this.inputDirPath, fileName)
    );
}

NodeDirectoryContext.prototype.resolve = function(fileName: string) {
    const resolvedFilePath = resolve(this.resourceDirPath, fileName);
    return relative(this.outputDirPath, resolvedFilePath);
};
