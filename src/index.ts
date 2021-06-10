import { cosmiconfigSync } from 'cosmiconfig';
import execute from './execute';
import type { FontFaceNodeConfig } from './index.d';

export default () => {
    const explorerSync = cosmiconfigSync('font-face');
    const { config } = explorerSync.search();

    return execute(config as FontFaceNodeConfig);
}
