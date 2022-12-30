import { SettingsControls } from './enums';

export const mapSettingsControlsToHandler: Record<SettingsControls, Function> = {
    [SettingsControls.WALK_UP]: '',
    [SettingsControls.WALK_DOWN]: '',
    [SettingsControls.WALK_LEFT]: '',
    [SettingsControls.WALK_RIGHT]: '',
};

function setSettingsControls(control: SettingsControls) {}
