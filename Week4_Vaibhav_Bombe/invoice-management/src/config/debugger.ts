import debug from 'debug';

const appDebug = debug('app');
const dbDebug = debug('db');

debug.enable('*');

export { appDebug, dbDebug };
