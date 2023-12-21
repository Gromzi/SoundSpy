type Colors = {
  primary: string;
  secondary: string;
  contrast: string;
  cardContrast: string;
  disabledCardContrast: string;
  text: string;
  cardText: string;
  disabledCardText: string;
  error: string;
  darkerPrimary: string;

  rock: string;
  pop: string;
  rap: string;
  edm: string;
  country: string;
  metal: string;
  classical: string;
  jazz: string;
};

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

    classical: '#FFD700', // Gold
    disco: '#FF69B4', // Medium Violet Red
    edm: '#00CED1', // Dark Turquoise
    funk: '#8A2BE2', // Blue-Violet
    heavy_metal: '#808080', // Gray
    hip_hop: '#FF6347', // Tomato
    jazz: '#32CD32', // Lime Green
    pop: '#FF4500', // Orange-Red
    reggae: '#228B22', // Forest Green
    rock: '#5E60CE', // Lighter Indigo
    techno: '#00CED1', // Dark Turquoise
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

    classical: '#4CAF50',    // Green
    disco: '#006666', // Dark Teal
    edm: '#B22222', // Fire Brick
    funk: '#551A8B', // Purple
    heavy_metal: '#696969', // Dim Gray
    hip_hop: '#006400', // Dark Green
    jazz: '#FF4500', // Orange-Red
    pop: '#800080', // Purple
    reggae: '#00008B', // Dark Blue
    rock: '#8B0000', // Dark Red
    techno: '#008B8B', // Dark Cyan
  },
};

export { colorPalette, Colors };
