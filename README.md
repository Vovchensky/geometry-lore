<div align="center">

# лор геометрии

**интерактивная история геометрии от древнего египта до наших дней**

[демо](https://vovchensky.github.io/geometry-lore/) · [english](#english)

<a href="https://vovchensky.github.io/geometry-lore/">
  <img src="./public/og.png" alt="лор геометрии" width="1200" />
</a>

</div>

## о проекте

одностраничный интерактивный лонгрид, рассказывающий историю геометрии — от верёвок египетских землемеров до неевклидовых пространств. тёмный минималистичный дизайн, scroll-анимации, генеративный SVG-фон и уважение к `prefers-reduced-motion`.

контент основан на статье [«геометрия»](https://ru.wikipedia.org/wiki/Геометрия) из русской википедии и дополнительных исторических источниках.

## возможности

- 🌍 два языка — русский и английский, автоопределение по браузеру
- 🎨 генеративные SVG-фигуры на фоне — уникальные при каждом визите
- ✨ scroll-анимации через GSAP + ScrollTrigger
- 🧈 плавный скролл через Lenis
- 📐 индикатор эпохи с плавной анимацией ширины
- ♿ поддержка `prefers-reduced-motion`
- 📱 адаптив: мобилки → планшеты → десктоп → ultrawide 21:9
- 🔍 SEO: семантический HTML, OG-теги
- 🥚 easter egg

## стек

| | |
|---|---|
| фреймворк | React, TypeScript |
| сборка | Vite |
| анимации | GSAP, ScrollTrigger |
| скролл | Lenis |
| i18n | i18next, react-i18next |
| стили | SCSS Modules |
| деплой | GitHub Pages |

## запуск

```bash
git clone https://github.com/Vovchensky/geometry-lore.git
cd geometry-lore
npm install
npm run dev
```

## сборка

```bash
npm run build
```

## лицензия

[MIT](./LICENSE)

## автор

[vovchensky](https://github.com/Vovchensky)

---

<div align="center">

<a id="english"></a>

# geometry lore

**an interactive history of geometry from ancient egypt to modern day**

[demo](https://vovchensky.github.io/geometry-lore/) · [русский](#лор-геометрии)

<a href="https://vovchensky.github.io/geometry-lore/">
  <img src="./public/og-english.png" alt="geometry lore" width="1200" />
</a>

</div>

## about

a single-page interactive longread telling the story of geometry — from the ropes of egyptian surveyors to non-euclidean spaces. dark minimalist design, scroll animations, generative SVG background, and respect for `prefers-reduced-motion`.

content is based on the [«geometry»](https://ru.wikipedia.org/wiki/Геометрия) article from russian wikipedia and additional historical sources.

## features

- 🌍 two languages — russian and english, auto-detected from browser
- 🎨 generative SVG shapes in the background — unique on every visit
- ✨ scroll animations via GSAP + ScrollTrigger
- 🧈 smooth scrolling via Lenis
- 📐 epoch indicator with smooth width animation
- ♿ `prefers-reduced-motion` support
- 📱 responsive: mobile → tablet → desktop → ultrawide 21:9
- 🔍 SEO: semantic HTML, OG tags
- 🥚 easter egg

## stack

| | |
|---|---|
| framework | React, TypeScript |
| build | Vite |
| animations | GSAP, ScrollTrigger |
| scroll | Lenis |
| i18n | i18next, react-i18next |
| styles | SCSS Modules |
| deploy | GitHub Pages |

## getting started

```bash
git clone https://github.com/Vovchensky/geometry-lore.git
cd geometry-lore
npm install
npm run dev
```

## build

```bash
npm run build
```

## license

[MIT](./LICENSE)

## author

[vovchensky](https://github.com/Vovchensky)
