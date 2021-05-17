import { cosmiconfigSync } from 'cosmiconfig';
import execute from './execute';

export default () => {
    const explorerSync = cosmiconfigSync('font-face');
    const { config } = explorerSync.search();

    return execute(config);
}
