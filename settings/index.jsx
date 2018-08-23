import { pebbleColors, sneakySpacer } from 'pebbleColors';
import { getThemePreviewSVG } from 'previewGenerators';

const defaultSettings = {
  timeColor: '#FF5500',
  sidebarColor: '#FF5500',
  backgroundColor: '#000000',
  sidebarTextColor: '#000000',
  extraTextColor: '#FFFFFF',
  colorTheme: {
    name: 'Orange Dreams',
    timeColor: '#FF5500',
    sidebarColor: '#FF5500',
    backgroundColor: '#000000',
    sidebarTextColor: '#000000',
    extraTextColor: '#FFFFFF',
  },
};

const colorThemes = [
  {
    name: sneakySpacer,
    displayName: 'Orange Dreams',
    timeColor: '#FF5500',
    sidebarColor: '#FF5500',
    backgroundColor: '#000000',
    sidebarTextColor: '#000000',
    extraTextColor: '#FFFFFF',
  },
  {
    name: sneakySpacer,
    displayName: 'Terminal Green',
    timeColor: '#00FF00',
    sidebarColor: '#00FF00',
    backgroundColor: '#000000',
    sidebarTextColor: '#000000',
    extraTextColor: '#00FF00',
  },
];

const renderColorSelector = (title, settingsKey, currentSelection) => (
  <Select
    label={
      <Text>
        {title}
        <ColorSelect
          colors={ [{ color: currentSelection }] }
          value={ '#ABCDEF' }
        />
      </Text>
    }
    selectViewTitle={title}
    options={pebbleColors}
    settingsKey={settingsKey}
    renderItem={
      (option) => {
        return (
          <ColorSelect
            colors={ [{ color: option.color }] }
            value={ option.color }
          />
        );
      }
    }
  />
);


const renderThemeSelector = (currentSelection) => (
  <Select
    label={
      <TextImageRow
        label="Theme"
        sublabel={ currentSelection.displayName }
        icon={ getThemePreviewSVG(currentSelection.timeColor, currentSelection.sidebarColor, currentSelection.backgroundColor) }
      />
    }
    options={ colorThemes }
    settingsKey="colorTheme"
    selectViewTitle="Theme"
    renderItem={
      (option) => {
        return (
          <TextImageRow
            label={ option.displayName }
            icon={ getThemePreviewSVG(option.timeColor, option.sidebarColor, option.backgroundColor) }
          />
        );
      }
    }
  />
);

const getCurrentSetting = (settingsKey, props) => {
  const currentSetting = JSON.parse(props.settings[settingsKey] || 'false');
  
  if (currentSetting === false) {
    return defaultSettings[settingsKey];
  } else {
    // hacky way to work around the weird way my custom color selectors store color
    if (settingsKey.endsWith('Color')) {
      return currentSetting.values[0].color;
    } else if (settingsKey === 'colorTheme') {
      return currentSetting.values[0];
    } else {
      return currentSetting;
    }
  }
}

const renderSettings = (props) => {
  const currentTimeColor = getCurrentSetting('timeColor', props);
  const currentSidebarColor = getCurrentSetting('sidebarColor', props);
  const currentBackgroundColor = getCurrentSetting('backgroundColor', props);
  const currentSidebarTextColor = getCurrentSetting('sidebarTextColor', props);
  const currentExtraTextColor = getCurrentSetting('extraTextColor', props);
  
  const customThemeEnabled = getCurrentSetting('customTheme', props);
  
  const currentTheme = customThemeEnabled ?
        {
          displayName: 'Custom',
          timeColor: currentTimeColor,
          sidebarColor: currentSidebarColor,
          backgroundColor: currentBackgroundColor,
        } : getCurrentSetting('colorTheme', props);
  
  return (
    <Page>
      
      <Section title="🎨 Colors">
        { renderThemeSelector(currentTheme) }
        <Toggle
          label={ <TextImageRow sublabel="Customize"/> }
          settingsKey="customTheme"
        />
      </Section>
      
      { customThemeEnabled === true &&
        <Section title="Customize Theme">
          { renderColorSelector('Background Color', 'backgroundColor', currentBackgroundColor) }
          { renderColorSelector('Sidebar Color', 'sidebarColor', currentSidebarColor) }
          { renderColorSelector('Text Color (Time)', 'timeColor', currentTimeColor) }
          { renderColorSelector('Text Color (Sidebar)', 'sidebarTextColor', currentSidebarTextColor) }
          { renderColorSelector('Text Color (Extras)', 'extraTextColor', currentExtraTextColor) }
        </Section>
      }
      
      <Section title="Sidebar Layout">
        <TextImageRow sublabel="hey"/>
      </Section>
    </Page>
  );
}


registerSettingsPage(renderSettings);