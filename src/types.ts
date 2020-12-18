export interface Game {
  attachTo: (element: HTMLElement) => void
  disableContextMenu: () => void
  getMouseState: () => MouseState
  setBackgroundColor: (colour: string) => void
  setRender: (callback: (gfx: Graphics) => void) => void
  setSize: (width: number, height: number) => void
  setSmoothing: (to: boolean) => void
  setUpdate: (callback: (dt: number) => void) => void
  start: () => void
}

export interface ButtonState {
  pressed: boolean
  justPressed: boolean
  released: boolean
  justReleased: boolean
}

export interface WheelState extends ButtonState {
  moved: boolean
  direction: string
}

export interface MouseState {
  x: number
  y: number

  left: ButtonState
  wheel: WheelState
  right: ButtonState
}

export interface Mouse {
  update: () => void
  start: () => void
  getState: () => MouseState
}

export interface Terrain {
  name: string
  type: number
  image: ImageBitmapSource
  tiles: Tile[]
}

export interface Vec2 {
  add: (v: Vec2) => void
  addScalar: (s: number) => void
  clone: (v: Vec2) => Vec2
  divide: (v: Vec2) => void
  divideScalar: (s: number) => void
  dot: (v: Vec2) => number
  getLength: () => number
  getOpposite: (v: Vec2) => Vec2
  getPerp: () => Vec2
  isEqualTo: (v: Vec2) => boolean
  multiply: (v: Vec2) => void
  multiplyScalar: (s: number) => void
  normalise: () => void
  setLength: (l: number) => void
  subtract: (v: Vec2) => void
  subtractScalar: (s: number) => void
  x: number
  y: number
}

export interface Frame {
  x: number
  y: number
  width: number
  height: number
}

export interface Sprite {
  x: number
  y: number
  rotation: number
  width: number
  height: number
  frames: Frame[]
  frame: number
  texture: CanvasImageSource
  colour: string
  setFrames: (newFrames: Frame[]) => void
  addFrame: (frame: Frame) => void
}

export interface TextBox {
  x: number
  y: number
  width: number
  height: number
  text: string
}

export interface KeyState {
  code: number
  label: string
  pressed: false
  justPressed: false
  released: false
  justReleased: false
}

export interface KeyboardState {
  [key: string]: KeyState
}

export interface Key {
  code: number
  label: string
  pressed: boolean
  justPressed: boolean
  released: boolean
  justReleased: boolean
}

export interface RectangleOptions {
  fill?: {
    colour?: string
    opacity?: number
  }

  line?: {
    width?: number
    colour?: string
    opacity?: number
  }
}

export interface Position {
  x: number
  y: number
}

export interface GridOptions {
  pos: Position
  visible: boolean
  divisions: number
  tileWidth: number
  tileHeight: number
  scale: number
}

export interface Grid {
  pos: Position
  visible: boolean
  divisions: number
  tileWidth: number
  tileHeight: number
  tiles: number[][]
  width: number
  height: number
  tileSize: number
  scale: number
}

export interface CircleOptions {
  fill?: {
    colour?: string
    opacity?: number
  }

  line?: {
    colour?: string
    opacity?: number
    width?: number
  }
}

export interface LineOptions {
  width?: number
  colour?: string
}

export interface Point {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Tile {
  type: number
  position: Point
  size: Size
}

export interface SpriteSheet {
  type: number
  tiles: Tile[]
  image: CanvasImageSource
}

export interface Graphics {
  circle: (x: number, y: number, radius: number, options: CircleOptions) => void
  clear: (colour: string) => void
  square: (
    x: number,
    y: number,
    size: number,
    options: RectangleOptions
  ) => void
  rect: (
    x: number,
    y: number,
    w: number,
    h: number,
    options: RectangleOptions
  ) => void
  image: (
    x: number,
    y: number,
    w: number,
    h: number,
    image: CanvasImageSource
  ) => void
  line: (from: Point, to: Point, options: LineOptions) => void
  sprite: (sprite: Sprite) => void
  subImage: (
    x: number,
    y: number,
    w: number,
    h: number,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    image: CanvasImageSource
  ) => void
  text: (
    x: number,
    y: number,
    text: string,
    colour: string,
    font: string
  ) => void
  textbox: (textbox: TextBox) => void
  tiles: (
    positionX: number,
    positionY: number,
    tileGrid: number[][],
    spriteSheets: SpriteSheet[],
    scale: number,
    tileWidth: number,
    tileHeight: number
  ) => void
  shadow: (drawingOperations: () => {}, options: DropShadowOptions) => void
  dodge: (drawingOperations: () => {}) => void
  overlay: (drawingOperations: () => {}) => void
  transparency: (drawingOperations: () => {}) => void
}

export interface DropShadowOptions {
  shadowcolour?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
}
