import path from 'path';
import type { Configuration } from 'webpack';
import { NormalModuleReplacementPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import grafanaConfig, { Env } from './.config/webpack/webpack.config';

const config = async (env: Env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);
  const legacyScenesPath = path.join(
    'node_modules',
    '@volkovlabs',
    'components',
    'node_modules',
    '@grafana',
    'scenes'
  );
  const legacyReactRouterDomPath = path.resolve(__dirname, 'node_modules/@grafana/ui/node_modules/react-router-dom');

  return merge(baseConfig, {
    plugins: [
      // @volkovlabs/components vendors @grafana/scenes v5, which expects the React Router v5 Switch API.
      new NormalModuleReplacementPlugin(/^react-router-dom$/, (resource) => {
        if (resource.context.includes(legacyScenesPath)) {
          resource.request = legacyReactRouterDomPath;
        }
      }),
    ],
  });
};

export default config;
