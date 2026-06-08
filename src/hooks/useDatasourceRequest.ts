/**
 * Inlined from @volkovlabs/components hooks/useDatasourceRequest.ts.
 */
import { DataQueryResponse, InterpolateFunction, LoadingState } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';
import { useCallback } from 'react';
import { lastValueFrom } from 'rxjs';

/**
 * Data Source Response Error
 */
export class DatasourceResponseError {
  public readonly message: string;

  constructor(
    public readonly error: unknown,
    target: string
  ) {
    if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string') {
        this.message = error.message;
      } else {
        this.message = JSON.stringify(error, null, 2);
      }
    } else {
      this.message = 'Unknown Error';
    }

    this.message += `\nRequest: ${target}`;
  }
}

/**
 * Use Data Source Request
 */
export const useDatasourceRequest = () => {
  return useCallback(
    async ({
      query,
      datasource,
      replaceVariables,
      payload,
    }: {
      query: unknown;
      datasource: string;
      replaceVariables: InterpolateFunction;
      payload: unknown;
    }): Promise<DataQueryResponse> => {
      const ds = await getDataSourceSrv().get(datasource);

      const targetJson = replaceVariables(JSON.stringify(query, null, 2), {
        payload: {
          value: payload,
        },
      });

      const target = JSON.parse(targetJson);

      try {
        const response = ds.query({
          targets: [target],
        } as never);

        const handleResponse = (response: DataQueryResponse) => {
          if (response.state && response.state === LoadingState.Error) {
            throw response?.errors?.[0] || response;
          }
          return response;
        };

        if (response instanceof Promise) {
          return await response.then(handleResponse);
        }

        return await lastValueFrom(response).then(handleResponse);
      } catch (error) {
        throw new DatasourceResponseError(error, targetJson);
      }
    },
    []
  );
};
