import { pebbleColors, colorNames, sneakySpacer } from './pebbleColors';
import { getThemePreviewSVG, getColorPreviewSVG } from './previewGenerators';
import SuperColorSelect from './components/SuperColorSelect';

const presetColorThemes = [
  {
    displayName: 'Orange Dreams',
    timeColor: '#FF5500',
    sidebarColor: '#FF5500',
    backgroundColor: '#000000',
    sidebarTextColor: '#000000',
    extraTextColor: '#FFFFFF',
    name: sneakySpacer,
  },
  {

    displayName: 'Terminal Green',
    timeColor: '#00FF00',
    sidebarColor: '#00FF00',
    backgroundColor: '#000000',
    sidebarTextColor: '#000000',
    extraTextColor: '#00FF00',
    name: sneakySpacer,
  },
];

const defaultSettings = {
  timeColor: '#FF5500',
  sidebarColor: '#FF5500',
  backgroundColor: '#000000',
  sidebarTextColor: '#000000',
  extraTextColor: '#FFFFFF',
  colorTheme: presetColorThemes[0],
  hideLeadingZero: 'false',
};

const renderThemeSelector = (currentSelection, props) => (
  <Select
    label={
      <TextImageRow
        label="Theme"
        sublabel={currentSelection.displayName}
        icon={getThemePreviewSVG({ timeColor: currentSelection.timeColor, sidebarColor: currentSelection.sidebarColor, backgroundColor: currentSelection.backgroundColor })}
      />
    }
    options={ presetColorThemes }
    settingsKey="colorTheme"
    selectViewTitle="Theme"
    renderItem={
      (option) => {
        return (
          <TextImageRow
            label={option.displayName}
            icon={getThemePreviewSVG({ timeColor: option.timeColor, sidebarColor: option.sidebarColor, backgroundColor: option.backgroundColor })}
          />
        );
      }
    }
  />
);

const getCurrentSetting = (settingsKey, props) => {
  const currentSetting = JSON.parse(props.settings[settingsKey] || 'false');
  console.log(`${settingsKey} is ${props.settings[settingsKey]}`);

  if (currentSetting === false) {
    return defaultSettings[settingsKey];
  } else {
    if (settingsKey.endsWith('Color')) {
      // "color" settings need to be extracted from their unnecessary container structure
      return currentSetting.values[0].color;
    } else if (settingsKey === 'colorTheme') {
      return currentSetting.values[0];
    } else {
      return currentSetting;
    }
  }
}

const SettingsPage = (props) => {
  const currentTimeColor = getCurrentSetting('timeColor', props);
  const currentSidebarColor = getCurrentSetting('sidebarColor', props);
  const currentBackgroundColor = getCurrentSetting('backgroundColor', props);
  const currentSidebarTextColor = getCurrentSetting('sidebarTextColor', props);
  const currentExtraTextColor = getCurrentSetting('extraTextColor', props);

  const useCustomTheme = getCurrentSetting('useCustomTheme', props);
  
  // test thing to see if we can manually change settings
//   console.log(JSON.stringify(getCurrentSetting('colorTheme', props)));
  
//   props.settingsStorage.setItem('')
  
  const currentTheme = useCustomTheme ? {
    timeColor: currentTimeColor,
    sidebarColor: currentSidebarColor,
    backgroundColor: currentBackgroundColor,
    sidebarTextColor: currentSidebarTextColor,
    extraTextColor: currentExtraTextColor,
    displayName: 'Custom'
  } : getCurrentSetting('colorTheme', props);

//   console.log(currentTheme.timeColor);
  //props.settingsStorage.setItem('currentTimeColor', '#FF0000');
  //props.settingsStorage.setItem('showLeadingZero', 'true');

  return (
    <Page>

      <Section title="🎨 Colors">
        {renderThemeSelector(currentTheme, props)}
        <Toggle
          label={<TextImageRow sublabel="Use Custom Theme" />}
          settingsKey="useCustomTheme"
        />
        {useCustomTheme === true && [
          <SuperColorSelect
            title="Background Color"
            settingsKey="backgroundColor"
            currentSelection={ currentTheme.backgroundColor }
            currentTheme={{ ...currentTheme, backgroundColor: null }}
          />,
          <SuperColorSelect
            title="Sidebar Color"
            settingsKey="sidebarColor"
            currentSelection={ currentTheme.sidebarColor }
            currentTheme={{ ...currentTheme, sidebarColor: null }}
          />,
          <SuperColorSelect
            title="Text Color (Time)"
            settingsKey="timeColor" 
            currentSelection={ currentTheme.timeColor }
            currentTheme={{ ...currentTheme, timeColor: null }}
          />,
          <SuperColorSelect
            title="Text Color (Sidebar)"
            settingsKey="sidebarTextColor"
            currentSelection={ currentTheme.sidebarTextColor }
          />,
          <SuperColorSelect
            title="Text Color (Extras)"
            settingsKey="extraTextColor"
            currentSelection={ currentTheme.extraTextColor }
          />
        ]}
      </Section>

      <Section title="⚙️ Sidebar Layout">
        <TextImageRow sublabel="hey" />
      </Section>
      
      <Section title="🕰 Time Display">
        <Toggle
          label={<TextImageRow label="Hide Leading Zero" sublabel="Display '6' instead of '06'" />}
          settingsKey="hideLeadingZero"
        />
      </Section>
    </Page>
  );
}


registerSettingsPage(SettingsPage);
