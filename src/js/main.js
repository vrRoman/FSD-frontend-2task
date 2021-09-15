import '@/public/browserconfig.xml';
import '@/public/site.webmanifest';

import importAll from './helpers/importAll';

importAll(require.context('@/public', true, /\.(png|jpe?g|gif|svg|ico)$/i));
importAll(require.context('../', true, /\.pug$/));
