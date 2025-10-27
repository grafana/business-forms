// webpack.config.ts
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import grafanaConfig from './.config/webpack/webpack.config';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * Config
 */
const config = async (env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);

  return merge(baseConfig, {
    output: {
      asyncChunks: true,
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: '../LICENSE-original', to: '.' },
          { from: '../NOTICES.md', to: '.' },
        ],
      }),
    ],
  });
};

export default config;
