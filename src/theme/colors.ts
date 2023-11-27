type ColorPalette = {
  primary: string
  secondary: string
  contrast: string
  cardContrast: string
  disabledCardContrast: string
  text: string
  cardText: string
  disabledCardText: string
  error: string
  darkerPrimary: string

  rock: string
  pop: string
  rap: string
  edm: string
  country: string
  metal: string
  classical: string
  jazz: string
}

const colorPalette = {
  dark: {
    primary: '#8B1874',
    secondary: '#F79540',
    contrast: '#2F3033',
    cardContrast: '#FCECDD',
    disabledCardContrast: '#6f6b67',
    text: '#FCECDD',
    cardText: '#FCECDD',
    disabledCardText: '#6f6b67',
    error: '#D43232',
    darkerPrimary: '#731460',

    rock: '#BE3144',
    pop: '#818FB4',
    rap: '#647E68',
    edm: '#FF6969',
    country: '#b8a038',
    metal: '#FFC045',
    classical: '#FAF0E6',
    jazz: '#A5C9CA',
  },
  light: {
    primary: '#F79540',
    secondary: '#8B1874',
    contrast: '#FCECDD',
    cardContrast: '#2F3033',
    disabledCardContrast: '#2F3033', //?
    text: '#FCECDD',
    cardText: '#2F3033',
    disabledCardText: '#2F3033', //?
    error: '#D43232',
    darkerPrimary: '#cf7d36',

    rock: '#7D0633',
    pop: '#5C2A9D',
    rap: '#647E68',
    edm: '#3F0071',
    country: '#191919',
    metal: '#B3541E',
    classical: '#472D2D',
    jazz: '#22092C',
  },
}

export { colorPalette, ColorPalette }
