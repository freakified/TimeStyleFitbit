import pebbleColors from 'pebbleColors';

const defaultSettings = {
  timeColor: '#FF5500',
  sidebarColor: '#FF5500',
  backgroundColor: '#000000',
  sidebarTextColor: '#000000',
  extraTextColor: '#FFFFFF',
};

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


const getCurrentSetting = (settingsKey, props) => {
  const currentSetting = JSON.parse(props.settings[settingsKey] || 'false');
  
  if (currentSetting === false) {
    return defaultSettings[settingsKey];
  } else {
    // hacky way to work around the weird way my custom color selectors store color
    if(settingsKey.indexOf('Color') !== -1) {
      return currentSetting.values[0].color;
    } else {
      return currentSetting;
    }
  }
}

const getThemePreviewSVG = (timeColor, sidebarColor, backgroundColor) => {
  const timeColorEnc = `%23${timeColor.substring(1)}`;
  const sidebarColorEnc = `%23${sidebarColor.substring(1)}`;
  const backgroundColorEnc = `%23${backgroundColor.substring(1)}`;
  
  return `data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20401%22%3E%3Cpath%20d%3D%22M0%200h400v400H0z%22%20fill%3D%22${backgroundColorEnc}%22%2F%3E%3Cpath%20d%3D%22M194.1%20349.5h-91.8v-18.6l56.2-55.9c4.2-4.2%209.5-8.8%2012.7-13.7a29.1%2029.1%200%200%200%204.6-16.2%2023.7%2023.7%200%200%200-15.3-22.6%2030.2%2030.2%200%200%200-9.8-1.7c-7.2%200-13.1%202.3-17.8%206.9a30.7%2030.7%200%200%200-8.7%2017.6l-19-3.2a43.8%2043.8%200%200%201%2028.8-34.7%2051.6%2051.6%200%200%201%2016.9-2.8%2056.1%2056.1%200%200%201%2016.8%202.6%2042.8%2042.8%200%200%201%2014.3%207.6%2036.4%2036.4%200%200%201%209.9%2012.5%2040.3%2040.3%200%200%201%203.7%2017.4%2043.9%2043.9%200%200%201-1.8%2012.5%2050%2050%200%200%201-4.9%2011.1c-2.1%203.5-6.3%206.8-9%209.8s-5.7%206.2-8.8%209.3l-45.9%2045.1h68.9zM237.5%20267.9h5.7a66.2%2066.2%200%200%200%2011.7-1.1c3.5-.7%205.2-1.9%208.3-3.8a19.9%2019.9%200%200%200%207.1-7.3%2022.8%2022.8%200%200%200%202.7-11.4%2022.1%2022.1%200%200%200-2-9.8%2021.7%2021.7%200%200%200-5.5-7.3c-4.8-4.1-9.3-6.4-15.7-6.4a25.7%2025.7%200%200%200-15.3%204.6%2027.9%2027.9%200%200%200-9.4%2012.8l-17.6-6.2a42.1%2042.1%200%200%201%2016.7-20.1q11.4-7.2%2026.4-7.2c5.6-.1%209.5.8%2014.9%202.5a40.8%2040.8%200%200%201%2013.8%207.3%2034%2034%200%200%201%209.4%2011.9%2036.6%2036.6%200%200%201%203.4%2016.6%2030.7%2030.7%200%200%201-1.9%2011.2%2034.3%2034.3%200%200%201-5.1%209.4%2034.1%2034.1%200%200%201-17.9%2011.5v.4a39.8%2039.8%200%200%201%2011.5%204.2%2036.4%2036.4%200%200%201%209.1%207.5%2035.2%2035.2%200%200%201%208.1%2022.8%2041.2%2041.2%200%200%201-3.9%2018.6%2040.4%2040.4%200%200%201-10.4%2013.5%2046%2046%200%200%201-15.1%208.1%2055.4%2055.4%200%200%201-17.6%202.8c-11.1%200-21-2.5-29.5-7.6s-14.7-12.9-18.6-23.5l18-6a31.3%2031.3%200%200%200%2010.8%2015c5.1%203.8%2011.4%205.8%2018.9%205.8a33.3%2033.3%200%200%200%2010.4-1.7%2027.1%2027.1%200%200%200%209.1-5.1%2025.1%2025.1%200%200%200%206.4-8.4%2026.6%2026.6%200%200%200%202.4-11.8%2022.5%2022.5%200%200%200-3.2-12.3%2024.7%2024.7%200%200%200-8.3-8.1%2036%2036%200%200%200-11.4-4.4%20108.8%20108.8%200%200%200-12.6-1.7h-5.5zM238.1%20102.9v.4c2.5-1.4%203.5-2.3%206.3-2.8a46.8%2046.8%200%200%201%2026.9%202.3%2043.4%2043.4%200%200%201%2014%209.1%2044.7%2044.7%200%200%201%209.4%2014.1%2046.8%2046.8%200%200%201%203.4%2017.7%2051%2051%200%200%201-3.7%2019.3%2045.3%2045.3%200%200%201-10.3%2014.9%2046.6%2046.6%200%200%201-15.5%209.5%2051.3%2051.3%200%200%201-37-.1%2045.3%2045.3%200%200%201-15.5-9.6%2044.6%2044.6%200%200%201-10.1-14.8%2047.4%2047.4%200%200%201-3.7-18.5%2055.8%2055.8%200%200%201%203.8-21%20119.5%20119.5%200%200%201%2010-19.1L251.3%2046h23zm-15.9%2041.8a31.1%2031.1%200%200%200%202.1%2011.7%2027.6%2027.6%200%200%200%205.9%209.5%2029.7%2029.7%200%200%200%209.3%206.4%2030.5%2030.5%200%200%200%2011.9%202.4%2023.7%2023.7%200%200%200%2010.2-2.2%2026.9%2026.9%200%200%200%2015.1-15.9%2030.7%2030.7%200%200%200%202.1-12%2030%2030%200%200%200-2.1-11.8%2028.8%2028.8%200%200%200-5.7-9.3%2025.4%2025.4%200%200%200-9.1-6.2c-3.8-1.5-6.2-2.3-10.3-2.2a31.6%2031.6%200%200%200-12.1%202.2%2026.6%2026.6%200%200%200-9.3%206.2%2027.6%2027.6%200%200%200-6%209.3%2032.6%2032.6%200%200%200-2%2012z%22%20fill%3D%22${timeColorEnc}%22%2F%3E%3Cpath%20fill%3D%22${sidebarColorEnc}%22%20d%3D%22M320%201h80v400h-80z%22%2F%3E%3C%2Fsvg%3E`;
}

const renderSettings = (props) => {
  const currentTimeColor = getCurrentSetting('timeColor', props);
  const currentSidebarColor = getCurrentSetting('sidebarColor', props);
  const currentBackgroundColor = getCurrentSetting('backgroundColor', props);
  const currentSidebarTextColor = getCurrentSetting('sidebarTextColor', props);
  const currentExtraTextColor = getCurrentSetting('extraTextColor', props);
  
  return (
    <Page>
      <Section title="Color Theme">
        <TextImageRow
          sublabel="Current Theme"
          icon={ getThemePreviewSVG(currentTimeColor, currentSidebarColor, currentBackgroundColor) }
        />
      </Section>
      <Section title="Custom Theme">
        { renderColorSelector('Background Color', 'backgroundColor', currentBackgroundColor) }
        { renderColorSelector('Sidebar Color', 'sidebarColor', currentSidebarColor) }
        { renderColorSelector('Text Color (Time)', 'timeColor', currentTimeColor) }
        { renderColorSelector('Text Color (Sidebar)', 'sidebarTextColor', currentSidebarTextColor) }
        { renderColorSelector('Text Color (Extras)', 'extraTextColor', currentExtraTextColor) }
      </Section>
    </Page>
  );
}


registerSettingsPage(renderSettings);