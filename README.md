# Jazz

A minimal CSS design system. Drop in the stylesheet and use semantic HTML. No class names, no build step, no JavaScript required.

**[Documentation →](https://erikthalen.github.io/jazz/)**

## Usage

Link the stylesheet from the CDN:

```html
<link rel="stylesheet" href="https://esm.sh/gh/erikthalen/jazz@latest/jazz.css" />
```

That's it. Jazz styles native HTML elements directly, so a `<button>` looks like a button, an `<input>` looks like an input, and so on. No class names required.

```html
<fieldset role="group">
  <input type="text" placeholder="Search" />
  <button>Go</button>
</fieldset>
```

## Theming

Override the seed colors on `:root` to match your brand:

```css
:root {
  /* Same primary for both themes */
  --jazz-primary: #6366f1;

  /* Or tune per-theme using light-dark() */
  --jazz-primary: light-dark(#4f46e5, #818cf8);

  --jazz-neutral:      #6b7280;
  --jazz-constructive: #5dbb55;
  --jazz-destructive:  #ef5655;
}
```

Jazz responds to `prefers-color-scheme` automatically. Force a theme with `color-scheme` on any ancestor element:

```html
<html style="color-scheme: light">...</html>
<html style="color-scheme: dark">...</html>
```

## Philosophy

Jazz handles the look of interactive elements (buttons, inputs, popovers, dialogs) but deliberately stays out of the way of layout. CSS `flex` and `grid` are fast to write, easy to read, and need no abstraction on top of them.

## Components

Accordion, Badge, Button, Button Group, Card, Checkbox, Color Input, Dialog, Dropdown, Field, Kbd, Loading, Popover, Progress, Radio, Select, Separator, Slider, Submenu, Switch, Table, Text Field, Toast, Toggle, Toggle Group, Tooltip

[Browse the full component docs →](https://erikthalen.github.io/jazz/components/button)

## License

MIT
