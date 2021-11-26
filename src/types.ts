export type Game = {
  attachTo: (element: Element) => void
  canvas: HTMLCanvasElement
  disableContextMenu: () => void
  getMouseState: () => MouseState
  getKeyboardState: () => KeyboardState
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

export type MouseState = {
  position: Point

  left: ButtonState
  wheel: WheelState
  right: ButtonState
}

export type Mouse = {
  update: () => void
  start: () => void
  getState: () => MouseState
}

export type Keyboard = {
  start: () => void
  update: () => void
  getState: () => KeyboardState
}

export type Terrain = {
  name: string
  type: number
  image: HTMLImageElement
  tiles: Tile[]
}

export type Vec2 = {
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

export type Frame = {
  position: Point
  size: Size
}

export type Sprite = {
  position: Point
  rotation: number
  size: Size
  frames: Frame[]
  frame: number
  texture: HTMLImageElement
  colour: string
  setFrames: (newFrames: Frame[]) => void
  addFrame: (frame: Frame) => void
}

export type KeyState = {
  code: string
  name: string
  pressed: false
  justPressed: false
  released: false
  justReleased: false
}

export type KeyboardState = {
  [key: string]: KeyState
}

export type Key = {
  code: string
  name: string
  pressed: boolean
  justPressed: boolean
  released: boolean
  justReleased: boolean
}

export type RectangleOptions = {
  fill?: FillOptions
  line?: LineOptions
}

export type GridOptions = {
  pos?: Point
  visible?: boolean
  divisions?: number
  tileWidth?: number
  tileHeight?: number
  scale?: number
}

// NOTE: tileSize and tileWidth and tileHeight all together is weird
export type Grid = {
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

export type FillOptions = {
  colour?: string
  opacity?: number
}

export type CircleOptions = {
  fill?: FillOptions
  line?: LineOptions
}

export type LineOptions = {
  width?: number
  colour?: string
  opacity?: number
}

export type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

export type Point = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type Tile = {
  type: number
  position: Point
  size: Size
}

export type SpriteSheet = {
  type: number
  tiles: Tile[]
  image: CanvasImageSource
}

export type Graphics = {
  circle: (position: Point, radius: number, options: CircleOptions) => void
  clear: (colour: string) => void
  clearRect: (rectangle: Rectangle, colour: string) => void
  square: (position: Point, size: number, options: RectangleOptions) => void
  rect: (rectangle: Rectangle, options: RectangleOptions) => void
  image: (image: HTMLImageElement, position: Point, size: Size) => void
  line: (from: Point, to: Point, options: LineOptions) => void
  sprite: (sprite: Sprite) => void
  subImage: (
    image: HTMLImageElement,
    position: Point,
    size: Size,
    subPosition: Point,
    subSize: Size
  ) => void
  text: (position: Point, text: string, colour: string, font: string) => void
  tiles: (
    position: Point,
    tileGrid: number[][],
    spriteSheets: Terrain[],
    scale: number
  ) => void
  shadow: (drawingOperations: () => void, options?: DropShadowOptions) => void
  dodge: (drawingOperations: () => void) => void
  overlay: (drawingOperations: () => void) => void
  transparency: (drawingOperations: () => void) => void
}

export type DropShadowOptions = {
  shadowcolour?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
}
