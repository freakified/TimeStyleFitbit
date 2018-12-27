import { pebbleColors, colorNames, sneakySpacer } from '../pebbleColors';
import { getColorPreviewSVG, getThemePreviewSVG } from '../previewGenerators';

const SuperColorSelect = ({ title, settingsKey, currentSelection, currentTheme }) => {
  return (
    <Select
      label={
        <TextImageRow
          label={title}
          sublabel={colorNames[currentSelection]}
          icon={getColorPreviewSVG(currentSelection)}
        />
      }
      selectViewTitle={title}
      options={pebbleColors}
      settingsKey={settingsKey}
      renderItem={
        (option) => {
          const previewSVG = currentTheme ?
            getThemePreviewSVG({
              timeColor:
                currentTheme.timeColor ? currentTheme.timeColor : option.color,
              sidebarColor:
                currentTheme.sidebarColor ? currentTheme.sidebarColor : option.color,
              backgroundColor:
                currentTheme.backgroundColor ? currentTheme.backgroundColor : option.color,
            })
            :
            getColorPreviewSVG(option.color);

          return (
            <TextImageRow
              label={ colorNames[option.color] }
              icon={ previewSVG }
            />
          );
        }
      }
    />
  );
};

export default SuperColorSelect;