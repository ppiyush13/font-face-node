import NodeDirectoryContext from '../nodeDirectoryContext';

describe('testing NodeDirectoryContext module', () => {

    it('should return true for NodeDirectoryContext.exists calls', () => {
        const nodeDirectoryContext = new NodeDirectoryContext({
            inputDirPath: '',
            outputDirPath: '',
            resourceDirPath: '',
        });

        expect(nodeDirectoryContext.exists('roboto')).toBe('');

    });

});
