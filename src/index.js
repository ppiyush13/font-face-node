import {  cosmiconfigSync } from 'cosmiconfig';
import execute from './execute';

export default () => {
    const explorerSync = cosmiconfigSync('font-face');
    const {config, filepath} = explorerSync.search();

    return execute({config, filepath});
}
