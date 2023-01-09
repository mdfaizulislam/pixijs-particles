import { DisplayObject } from "pixi.js";

export interface IScene extends DisplayObject {
  getName(): string;
  update(framesPassed: number): void;

  onDestry(): void;
}
