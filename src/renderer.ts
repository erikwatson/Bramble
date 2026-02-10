import {
  defaultCircle,
  defaultDropShadow,
  defaultLine,
  defaultTransform
} from './graphics/defaults'
import {
  circle as gfxCircle,
  rect as gfxRect,
  square as gfxSquare,
  curve as gfxCurve,
  line as gfxLine
} from './graphics/shapes'
import { clear as gfxClear, clearRect as gfxClearRect } from './graphics/clear'
import {
  CircleOptions,
  ColourShiftOptions,
  DropShadowOptions,
  LineOptions,
  Point,
  Rectangle,
  RectangleOptions,
  Renderer,
  Size,
  Sprite,
  StrokeGlowOptions,
  Terrain,
  TextOptions,
  TransformOptions
} from './types'
import { defaultColourShift, defaultStrokeGlow } from './graphics/effects'
import { image as gfxImage, subImage as gfxSubImage } from './graphics/images'
import { txt as gfxTxt } from './graphics/text'
import { tiles as gfxTiles } from './graphics/tiles'
import { sprite as gfxSprite } from './graphics/sprites'
import { merge } from './utils/object'

function create(ctx: CanvasRenderingContext2D): Renderer {
  let commands = []
  let filterStack = []
  let compositeStack = []
  let transformStack = []
  let alphaStack = []
  let shadowStack = []

  function reset() {
    commands = []
    filterStack = []
    compositeStack = []
    transformStack = []
    alphaStack = []
    shadowStack = []

    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.filter = 'none'
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  function recomputeTransforms() {
    ctx.setTransform(1, 0, 0, 1, 0, 0) // reset

    for (const t of transformStack) {
      const tr = t // t itself is the transform object

      if ('scale' in tr) {
        const f = tr.scale
        ctx.translate(tr.around.x, tr.around.y)
        if (typeof f === 'number') ctx.scale(f, f)
        else ctx.scale(f.x, f.y)
        ctx.translate(-tr.around.x, -tr.around.y)
      }

      if ('rotate' in tr) {
        ctx.translate(tr.around.x, tr.around.y)
        ctx.rotate((tr.rotate * Math.PI) / 180)
        ctx.translate(-tr.around.x, -tr.around.y)
      }
    }
  }

  function recomputeAlpha() {
    ctx.globalAlpha = alphaStack.reduce((acc, a) => acc * a, 1)
  }

  function recomputeShadow() {
    const top = shadowStack[shadowStack.length - 1]

    if (!top) {
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      return
    }

    ctx.shadowColor = top.shadowColour
    ctx.shadowBlur = top.shadowBlur
    ctx.shadowOffsetX = top.shadowOffsetX
    ctx.shadowOffsetY = top.shadowOffsetY
  }

  function pushBlurFilter(px: number) {
    commands.push({ type: 'push', filter: `blur(${px}px)` })
  }

  function pushColourShiftFilter(options: ColourShiftOptions) {
    const { hue, saturate } = options
    commands.push({
      type: 'push',
      filter: `hue-rotate(${hue}deg) saturate(${saturate})`
    })
  }

  function pushShadow(options: DropShadowOptions) {
    commands.push({ type: 'pushShadow', shadow: options })
  }

  function popShadow() {
    commands.push({ type: 'popShadow' })
  }

  function popFilter() {
    commands.push({ type: 'pop' })
  }

  function blur(drawingOperations: () => void, radius = 4) {
    pushBlurFilter(radius)
    drawingOperations()
    popFilter()
  }

  function colourShift(
    drawingOperations: () => void,
    options: ColourShiftOptions = defaultColourShift
  ) {
    pushColourShiftFilter(options)
    drawingOperations()
    popFilter()
  }

  function pushComposite(op: GlobalCompositeOperation) {
    commands.push({ type: 'pushComposite', op })
  }

  function popComposite() {
    commands.push({ type: 'popComposite' })
  }

  function pushRotationTransform(rotation: number, around: Point) {
    commands.push({
      type: 'pushTransform',
      transform: { rotate: rotation, around }
    })
  }

  function popTransform() {
    commands.push({ type: 'popTransform' })
  }

  function pushScale(factor: number | Point, around: Point = { x: 0, y: 0 }) {
    commands.push({
      type: 'pushTransform',
      transform: { scale: factor, around }
    })
  }

  function popScale() {
    commands.push({ type: 'popTransform' })
  }

  function pushStrokeGlow(options: StrokeGlowOptions = defaultStrokeGlow) {

    commands.push({
      type: 'pushShadow',
      shadow: {
        shadowColour: options.colour ?? 'white',
        shadowBlur: options.blur ?? 8,
        shadowOffsetX: 0,
        shadowOffsetY: 0
      }
    })
  }

  function strokeGlow(
    drawingOperations: () => void,
    options: StrokeGlowOptions = defaultStrokeGlow
  ) {
    pushStrokeGlow(options)
    drawingOperations()
    popShadow()
  }

  function scale(
    drawingOperations: () => void,
    factor: number | Point,
    around: Point = { x: 0, y: 0 }
  ) {
    pushScale(factor, around)
    drawingOperations()
    popScale()
  }

  function rotation(
    drawingOperations: () => void,
    rotateBy: number,
    around: Point = { x: 0, y: 0 }
  ) {
    pushRotationTransform(rotateBy, around)
    drawingOperations()
    popTransform()
  }

  function dodge(drawingOperations: () => void) {
    pushComposite('color-dodge')
    drawingOperations()
    popComposite()
  }

  function overlay(drawingOperations: () => void) {
    pushComposite('overlay')
    drawingOperations()
    popComposite()
  }

  function pushAlpha(alpha: number) {
    commands.push({ type: 'pushAlpha', alpha })
  }

  function popAlpha() {
    commands.push({ type: 'popAlpha' })
  }

  function transparency(drawingOperations: () => void, alpha = 0.25) {
    pushAlpha(alpha)
    drawingOperations()
    popAlpha()
  }

  function circle(
    position: Point,
    radius: number,
    options: CircleOptions = defaultCircle
  ) {
    commands.push({
      type: 'draw',
      fn: () => gfxCircle(ctx, position, radius, options)
    })
  }

  function clear(colour: string) {
    commands.push({
      type: 'draw',
      fn: () => gfxClear(ctx, colour)
    })
  }

  function clearRect(rectangle: Rectangle, colour?: string) {
    commands.push({
      type: 'draw',
      fn: () => gfxClearRect(ctx, rectangle, colour)
    })
  }

  function curve(
    from: Point,
    to: Point,
    controlPoints: { cp1?: Point; cp2?: Point },
    options: LineOptions = defaultLine
  ) {
    commands.push({
      type: 'draw',
      fn: () => gfxCurve(ctx, from, to, controlPoints, options)
    })
  }

  function image(image: HTMLImageElement, position: Point, size?: Size) {
    commands.push({
      type: 'draw',
      fn: () => gfxImage(ctx, image, position, size)
    })
  }

  function subImage(
    image: CanvasImageSource,
    position: Point,
    size: Size,
    subPosition: Point,
    subSize: Size
  ) {
    commands.push({
      type: 'draw',
      fn: () => gfxSubImage(ctx, image, position, size, subPosition, subSize)
    })
  }

  function line(from: Point, to: Point, options: LineOptions) {
    commands.push({
      type: 'draw',
      fn: () => gfxLine(ctx, from, to, options)
    })
  }

  function rect(rectangle: Rectangle, options: RectangleOptions) {
    commands.push({
      type: 'draw',
      fn: () => gfxRect(ctx, rectangle, options)
    })
  }

  function shadow(
    drawingOperations: () => void,
    options: DropShadowOptions = defaultDropShadow
  ) {
    const merged = merge(defaultDropShadow, options)
    pushShadow(merged)
    drawingOperations()
    popShadow()
  }

  function sprite(spr: Sprite) {
    commands.push({
      type: 'draw',
      fn: () => gfxSprite(ctx, spr)
    })
  }

  function square(position: Point, size: number, options: RectangleOptions) {
    commands.push({
      type: 'draw',
      fn: () => gfxSquare(ctx, position, size, options)
    })
  }

  function txt(position: Point, text: string = '', options: TextOptions) {
    commands.push({
      type: 'draw',
      fn: () => gfxTxt(ctx, position, text, options)
    })
  }

  function tiles(
    position: Point,
    tileGrid: number[][],
    spriteSheets: Terrain[],
    scale: number
  ) {
    commands.push({
      type: 'draw',
      fn: () => gfxTiles(ctx, position, tileGrid, spriteSheets, scale)
    })
  }

  function transform(
    drawingOperations: () => void,
    options: TransformOptions = defaultTransform
  ) {
    const merged: TransformOptions = merge(defaultTransform, options)

    scale(
      () => {
        rotation(drawingOperations, merged.rotation, merged.around)
      },
      merged.scale,
      merged.around
    )
  }

  function multiplyEffect(drawingOperations: () => void) {
    pushComposite('multiply')
    drawingOperations()
    popComposite()
  }

  function screen(drawingOperations: () => void) {
    pushComposite('screen')
    drawingOperations()
    popComposite()
  }

  function render() {
    for (const cmd of commands) {
      switch (cmd.type) {
        case 'push': {
          filterStack.push(cmd.filter)
          ctx.filter = filterStack.join(' ')
          break
        }

        case 'pop': {
          filterStack.pop()
          ctx.filter = filterStack.join(' ')
          break
        }

        case 'pushAlpha':
          alphaStack.push(cmd.alpha)
          recomputeAlpha()
          break

        case 'popAlpha':
          alphaStack.pop()
          recomputeAlpha()
          break

        case 'pushComposite': {
          compositeStack.push(cmd.op)
          ctx.globalCompositeOperation =
            compositeStack[compositeStack.length - 1]
          break
        }
        case 'popComposite': {
          compositeStack.pop()
          ctx.globalCompositeOperation =
            compositeStack[compositeStack.length - 1] || 'source-over'
          break
        }
        case 'pushTransform':
          transformStack.push(cmd.transform)
          recomputeTransforms()
          break

        case 'popTransform':
          transformStack.pop()
          recomputeTransforms()
          break

        case 'pushShadow':
          shadowStack.push(cmd.shadow)
          recomputeShadow()
          break

        case 'popShadow':
          shadowStack.pop()
          recomputeShadow()
          break

        case 'draw': {
          cmd.fn()
          break
        }
      }
    }

    reset();
  }

  return {
    circle,
    clear,
    clearRect,
    curve,
    dodge,
    image,
    line,
    overlay,
    rotation,
    rect,
    shadow,
    sprite,
    scale,
    square,
    subImage,
    text: txt,
    tiles,
    transparency,
    transform,
    multiply: multiplyEffect,
    screen,
    blur,
    colourShift,
    strokeGlow,
    render
  }
}

export default { create }
