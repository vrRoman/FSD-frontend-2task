import importAll from './importAll';

importAll(
  require.context('../sass/', true, /\.s[ac]ss$/),
  require.context('../common.blocks/', true, /\.s[ac]ss$/),
  require.context('../pages/', true, /\.s[ac]ss$/),
);
