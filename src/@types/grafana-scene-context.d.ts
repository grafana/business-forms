import type { SceneObject } from '@grafana/scenes';

declare global {
  interface Window {
    __grafanaSceneContext?: SceneObject;
  }

  var __grafanaSceneContext: SceneObject | undefined;
}

export {};
