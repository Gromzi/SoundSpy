type Colors = {
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
    accordionBody: '#570f49',

    classical: '#FFD700',
    disco: '#FF1493',
    edm: '#00CED1',
    funk: '#FFD700',
    heavy_metal: '#808080',
    hip_hop: '#FF4500',
    jazz: '#8A2BE2',
    pop: '#FF69B4',
    reggae: '#00FF00',
    rock: '#FF4500',
    techno: '#00CED1',
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
    accordionBody: '#ffbf41',

    classical: '#483D8B',
    disco: '#E63E99',
    edm: '#009BA9',
    funk: '#B8860B',
    heavy_metal: '#808080',
    hip_hop: '#E53D30 ',
    jazz: '#7A67C7',
    pop: '#D13E00',
    reggae: '#2E8B57',
    rock: '#E53D30 ',
    techno: '#009BA9',
  },
}

export { colorPalette, Colors }
