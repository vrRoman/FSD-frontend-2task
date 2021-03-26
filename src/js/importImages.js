import importAll from './importAll';

importAll(require.context('../', true, /\.(png|jpe?g|gif|svg|ico)$/i));
