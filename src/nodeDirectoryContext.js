import pathExists from 'path-exists';
import {resolve, relative} from 'path';

export default function NodeDirectoryContext({inputDirPath, outputDirPath, resourceDirPath}) {
    this.inputDirPath = inputDirPath;
    this.outputDirPath = outputDirPath;
    this.resourceDirPath = resourceDirPath;
}

NodeDirectoryContext.prototype.exists = function(fileName) {
    return pathExists.sync(
        resolve(this.inputDirPath, fileName)
    );
}

NodeDirectoryContext.prototype.resolve = function(fileName) {
    const resolvedFilePath = resolve(this.resourceDirPath, fileName);
    return relative(this.outputDirPath, resolvedFilePath);
};