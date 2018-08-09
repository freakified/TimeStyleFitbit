const pebbleColors = [
    {color: '#000000'},
    {color: '#000055'},
    {color: '#0000AA'},
    {color: '#0000FF'},
    {color: '#005500'},
    {color: '#005555'},
    {color: '#0055AA'},
    {color: '#0055FF'},
    {color: '#00AA00'},
    {color: '#00AA55'},
    {color: '#00AAAA'},
    {color: '#00AAFF'},
    {color: '#00FF00'},
    {color: '#00FF55'},
    {color: '#00FFAA'},
    {color: '#00FFFF'},
    {color: '#550000'},
    {color: '#550055'},
    {color: '#5500AA'},
    {color: '#5500FF'},
    {color: '#555500'},
    {color: '#555555'},
    {color: '#5555AA'},
    {color: '#5555FF'},
    {color: '#55AA00'},
    {color: '#55AA55'},
    {color: '#55AAAA'},
    {color: '#55AAFF'},
    {color: '#55FF00'},
    {color: '#55FF55'},
    {color: '#55FFAA'},
    {color: '#55FFFF'},
    {color: '#AA0000'},
    {color: '#AA0055'},
    {color: '#AA00AA'},
    {color: '#AA00FF'},
    {color: '#AA5500'},
    {color: '#AA5555'},
    {color: '#AA55AA'},
    {color: '#AA55FF'},
    {color: '#AAAA00'},
    {color: '#AAAA55'},
    {color: '#AAAAAA'},
    {color: '#FFFFFF'},
    {color: '#AAAAFF'},
    {color: '#AAFF00'},
    {color: '#AAFF55'},
    {color: '#AAFFAA'},
    {color: '#AAFFFF'},
    {color: '#FF0000'},
    {color: '#FF0055'},
    {color: '#FF00AA'},
    {color: '#FF00FF'},
    {color: '#FF5500'},
    {color: '#FF5555'},
    {color: '#FF55AA'},
    {color: '#FF55FF'},
    {color: '#FFAA00'},
    {color: '#FFAA55'},
    {color: '#FFAAAA'},
    {color: '#FFAAFF'},
    {color: '#FFFF00'},
    {color: '#FFFF55'},
    {color: '#FFFFAA'},
];

const colorTest = [
    {name: 'Black', color: '#000000'},
    {name: 'Oxford Blue', color: '#000055'},
    {name: 'Duke Blue', color: '#0000AA'},
    {name: 'Blue', color: '#0000FF'},
];

const mySettings = (props) => {  
    return (
        <Page>
        <Section title="Color Theme" />
        <Section description ="Sidebar Color" />
        <Toggle
            settingsKey="show_customtimecolor"
            label={JSON.parse(props.settings.color)}
        />
        <Select
          label={`Selection`}
          options={colorTest}
          renderItem= {
            (option) => {
              return (
                <ColorSelect
                  colors={[{color: option.color}]}
                  onSelection={(value) => console.log(value)}
                  onClick={(evt) => evt.stopPropagation()}
                />
              );
            }
          }
        />


        <ColorSelect
            colors={[{color: '#0000FF'}]}
          disabled="true"
        />

        <ColorSelect
            settingsKey="color"
            colors={[{color: JSON.parse(props.settings.color)}]}
        />
        { (() => {
            if(JSON.parse(props.settings.show_customtimecolor || 'false')) {
                return (
                    <Section description="Select a color">
                        <ColorSelect
                            settingsKey="color"
                            colors={pebbleColors}
                        />
                    </Section>
                );
            }
        })() }
        </Page>
    );
}

registerSettingsPage(mySettings);