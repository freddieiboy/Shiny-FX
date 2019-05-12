# Shiny FX

Shiny FX is a component for designing shiny typography with any Google Font. This is the follow up to my gyroscope proof of concept component called Shiny. I've completely rewritten this component to support any custom shine that you want to create. Keep in mind that we're still at v1 so expect some bugs.

<img src="./metadata/cover.gif"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" />

Shines (gradients) are 3 color values. _Start_, _Middle_, and _End_ properties. The middle color is the one that moves along the gradient line. This is what causes the illusion effect.

> Note: Shiny FX works best with mobile devices that have window.deviceorientation events. This means that your prototypes can take advantage of the tilt angles of your phone.

## Property Panel

Props | Value
----- | -----|
**Start** | The beginning of the shine gradient.
**Middle** | The middle of the shine gradient.
**End** | The end of the shine gradient.
**Shiny Type** | Text or Background. Selecting Text shows all the properties to create a custom font with Google fonts. Background removes Text properties and makes the shine the size of the wrapper.
**Angle** | 0 to 360 degrees. Defines the angle of the middle color of the shine.
**Value** | Text value of the text.
**Font** | Font style as defined in the possible Google fonts list. If you search for a font that isn't available, you will get a default serif font.
**Size** | Size of the text value.
**Weight** | Font weight.
**Style** | Font style.
**Spacing** | Type spacing.
**Line** | Type line height.
Future SVG masking props goes here. | ✨

## Bonus `useGyro()`
This component comes with a simple React Hook for taking advantage of the gyroscope on a mobile device. Install this component and import this hook to use it anywhere.

```javascript
import { useGyro } from '@framer/freddieiboy.shinyfx/code/Shiny'

export function Box() {
    // Import this hook into your code components or Overrides.
    const { x, y, z, hasGryo } = useGyro()

    // You can use them in raw form or you can transform these nubmers with the Framer transform function.
    // Example: const newX = transform(x, [-180, 180], [0, 100])
    return <Frame x={x} y={y} rotate={z} />
}
```
### API Definitions
Key | Value
----------- | ---|
**x** | Number from -180 to 180.
**y** | Number from -90 to 90.
**z** | Number from 0 t0 360.
**hasGyro** | Boolean for checking gyroscope device.


[Submit an issue on github for questions, bugs, or future suggestions 🥰](https://github.com/freddieiboy/Shiny-FX)

----
## Version
- **v1.0** Launch!


