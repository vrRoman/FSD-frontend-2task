import importAll from './importAll';

importAll(require.context('../', true, /\.pug$/));
