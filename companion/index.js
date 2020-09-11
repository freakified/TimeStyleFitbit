import { encode } from 'cbor';
import companion from 'companion';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';

const colorSetting = value => value.values[0].color;
const booleanSetting = value => Boolean(value);

const settingsSchema = {
  timeColor: colorSetting,
  sidebarColor: colorSetting,
  backgroundColor: colorSetting,
  sidebarTextColor: colorSetting,
  extraTextColor: colorSetting,
  hideLeadingZero: booleanSetting,
};

const handleSettingsChanged = () => {
  // get settings from settingsStorage
  const settings = {};
  for (let key in settingsSchema) {
    const value = settingsStorage.getItem(key);
    if (value === null) continue
    settings[key] = settingsSchema[key](JSON.parse(value), settingsStorage);
  }

  // transfer settings to device
  outbox.enqueue('settings.cbor', new Uint8Array(encode(settings)));
}

settingsStorage.onchange = handleSettingsChanged;

if (companion.launchReasons.settingsChanged) {
  handleSettingsChanged();
}
