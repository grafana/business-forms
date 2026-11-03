import { E2ESelectorGroups, expect, PanelEditPage } from '@grafana/plugin-e2e';

/**
 * Set visualization on a new panel
 * Grafana 12.4+ opens the visualization picker on a new panel. plugin-e2e 3.15.4 setVisualization() clicks
 * the picker toggle whenever it is visible, which closes the open picker and times out. Close it first.
 * Same workaround as grafana/business-charts#122.
 */
export const setVisualization = async (editPage: PanelEditPage, selectors: E2ESelectorGroups, name: string) => {
  const vizPickerToggle = editPage.getByGrafanaSelector(selectors.components.PanelEditor.toggleVizPicker);
  const allVisualizationsTab = editPage.getByGrafanaSelector(
    selectors.components.Tab.title(selectors.constants.Tab.title)
  );

  if ((await vizPickerToggle.isVisible()) && (await allVisualizationsTab.isVisible())) {
    await vizPickerToggle.click();
    await expect(allVisualizationsTab).toBeHidden();
  }

  await editPage.setVisualization(name);
};
