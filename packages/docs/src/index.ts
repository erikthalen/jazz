import { Hono } from 'hono'
import { HomePage } from './pages/home'
import { IntroPage } from './pages/intro'
import { ButtonPage } from './pages/button'
import { FormPage } from './pages/form'
import { LoadingPage } from './pages/loading'
import { ThemesPage } from './pages/themes'
import { ProsePage } from './pages/prose'
import { AccordionPage } from './pages/accordion'
import { DialogPage } from './pages/dialog'
import { KbdPage } from './pages/kbd'
import { CardPage } from './pages/card'
import { ButtonGroupPage } from './pages/button-group'
import { CheckboxPage } from './pages/checkbox'
import { SwitchPage } from './pages/switch'
import { SliderPage } from './pages/slider'
import { TooltipPage } from './pages/tooltip'
import { PopoverPage } from './pages/popover'
import { RadioPage } from './pages/radio'
import { SeparatorPage } from './pages/separator'
import { ProgressPage } from './pages/progress'
import { ColorInputPage } from './pages/color-input'
import { TablePage } from './pages/table'

const app = new Hono()

app.get('/', (c) => c.html(HomePage(c.req.path)))
app.get('/introduction', (c) => c.html(IntroPage(c.req.path)))
app.get('/themes', (c) => c.html(ThemesPage(c.req.path)))
app.get('/components/prose', (c) => c.html(ProsePage(c.req.path)))
app.get('/components/accordion', (c) => c.html(AccordionPage(c.req.path)))
app.get('/components/dialog', (c) => c.html(DialogPage(c.req.path)))
app.get('/components/kbd', (c) => c.html(KbdPage(c.req.path)))
app.get('/components/card', (c) => c.html(CardPage(c.req.path)))
app.get('/components/button-group', (c) => c.html(ButtonGroupPage(c.req.path)))
app.get('/components/checkbox', (c) => c.html(CheckboxPage(c.req.path)))
app.get('/components/switch', (c) => c.html(SwitchPage(c.req.path)))
app.get('/components/slider', (c) => c.html(SliderPage(c.req.path)))
app.get('/components/tooltip', (c) => c.html(TooltipPage(c.req.path)))
app.get('/components/popover', (c) => c.html(PopoverPage(c.req.path)))
app.get('/components/radio', (c) => c.html(RadioPage(c.req.path)))
app.get('/components/separator', (c) => c.html(SeparatorPage(c.req.path)))
app.get('/components/progress', (c) => c.html(ProgressPage(c.req.path)))
app.get('/components/color-input', (c) => c.html(ColorInputPage(c.req.path)))
app.get('/components/table', (c) => c.html(TablePage(c.req.path)))
app.get('/components/button', (c) => c.html(ButtonPage(c.req.path)))
app.get('/components/form', (c) => c.html(FormPage(c.req.path)))
app.get('/components/loading', (c) => c.html(LoadingPage(c.req.path)))

export default app
