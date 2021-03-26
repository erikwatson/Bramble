export interface Game {
  canvas: HTMLCanvasElement
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
  position: Point

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
  image: CanvasImageSource
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
  position: Point
  size: Size
}

export interface Sprite {
  position: Point
  rotation: number
  size: Size
  frames: Frame[]
  frame: number
  texture: CanvasImageSource
  colour: string
  setFrames: (newFrames: Frame[]) => void
  addFrame: (frame: Frame) => void
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

export interface GridOptions {
  pos: Point
  visible: boolean
  divisions: number
  tileWidth: number
  tileHeight: number
  scale: number
}

// NOTE: tileSize and tileWidth and tileHeight all together is weird
export interface Grid {
  pos: Point
  visible: boolean
  divisions: number
  tileWidth: number
  tileHeight: number
  tiles: number[][]
  size: Size
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

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
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
  circle: (position: Point, radius: number, options: CircleOptions) => void
  clear: (colour: string) => void
  clearRect: (rectangle: Rectangle, colour: string) => void
  square: (position: Point, size: number, options: RectangleOptions) => void
  rect: (rectangle: Rectangle, options: RectangleOptions) => void
  image: (position: Point, size: Size, image: CanvasImageSource) => void
  line: (from: Point, to: Point, options: LineOptions) => void
  sprite: (sprite: Sprite) => void
  subImage: (
    position: Point,
    size: Size,
    subPosition: Point,
    sibSize: Size,
    image: CanvasImageSource
  ) => void
  text: (position: Point, text: string, colour: string, font: string) => void
  tiles: (
    position: Point,
    tileGrid: number[][],
    spriteSheets: Terrain[],
    scale: number,
    tileSize: Size
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
