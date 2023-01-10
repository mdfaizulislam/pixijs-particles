/**
 * Title: Random Tool
 * Description: technical challenge random tool, it is  a tool that will allow mixed text and images in an easy way (for example * displaying text with emoticons or prices with money icon). It should come up every 2 seconds a random text with images in
 * random configuration (image + text + image, image + image + image, image + image + text, text + image + text etc) and a random
 * font size.
 *
 * Author: Md Faizul Islam
 * Date: 08/01/2023
 *
 */

import { Emitter } from "@pixi/particle-emitter";
import { Container, Text } from "pixi.js";
import { EmitterConfig } from "../configs/EmitterConfig";
import { AppController } from "../controllers/AppController";
import { Helper } from "../generic/Helper";
import { IScene } from "../generic/IScene";
import { Logger } from "../generic/Logger";

export class GameSceneParticles extends Container implements IScene {
  private mLogger: Logger;
  private mlabelTitle: Text | null = null;
  private mTextFPS: Text | null = null;
  private mIsGameStopped: boolean;
  private mContainer: Container;
  private mEmitter: Emitter | null = null;
  private mElapsed: number = 0;
  private mEmitterContainer: Container;
  constructor() {
    super();
    this.mLogger = new Logger("GameSceneParticles", true);
    this.mIsGameStopped = false;
    this.sortableChildren = true;
    this.mContainer = new Container();
    this.mContainer.sortableChildren = true;
    this.addChild(this.mContainer);
    this.mContainer.zIndex = 2;
    this.mEmitterContainer = new Container();
    this.addChild(this.mEmitterContainer);
    this.init();
  }

  public onEnable(): void {}

  private init() {
    this.addGameTitle();
    this.showFPS();
    this.addMessage();

    document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange.bind(this)
    );

    this.addParticleEmitter();

    AppController.getApp().view.addEventListener(
      "pointerup",
      this.onMouseOrTouchTUp.bind(this)
    );
  }

  private addGameTitle(): void {
    this.mLogger.genericLog("addGameTitle");
    this.mlabelTitle = Helper.getLabelWithBasicFont("Particles");
    this.mlabelTitle.anchor.set(0.5, 0.5);
    this.mlabelTitle.x = this.mlabelTitle.width / 2 + 10;
    this.mlabelTitle.y = this.mlabelTitle.height / 2;
    this.mContainer.addChild(this.mlabelTitle);
    this.mlabelTitle.zIndex = 100;
  }

  private addMessage(): void {
    let textMessage = Helper.getLabelWithFontSize(
      "Touch or click any where",
      20
    );
    textMessage.anchor.set(0.5, 0.5);
    textMessage.x = AppController.width / 2;
    textMessage.y = textMessage.height + 50;
    this.mContainer.addChild(textMessage);
    textMessage.zIndex = 1;
  }

  addParticleEmitter() {
    this.mEmitter = new Emitter(
      // The PIXI.Container to put the emitter in
      // if using blend modes, it's important to put this
      // on top of a bitmap, and not use the root stage Container
      this.mEmitterContainer,
      // Emitter configuration, edit this to change the look
      // of the emitter
      EmitterConfig.AWESOME_PARTICLE_EMITTER
    );

    // Calculate the current time
    this.mElapsed = Date.now();

    this.mEmitter.updateOwnerPos(
      AppController.width / 2,
      AppController.height / 2
    );

    this.mEmitter.emit = true;
  }

  onMouseOrTouchTUp(event: any) {
    if (this.mEmitter) {
      this.mEmitter.emit = true;
      this.mEmitter.resetPositionTracking();
      this.mEmitter.updateOwnerPos(
        event.offsetX || event.layerX,
        event.offsetY || event.layerY
      );
    }
  }

  update(framesPassed: number): void {
    if (!AppController.visible) {
      return;
    }
    framesPassed;
    if (this.mTextFPS) {
      this.mTextFPS.text =
        "FPS: " + AppController.getApp().ticker.FPS.toFixed(2);
    }

    if (AppController.visible && this.mEmitter) {
      // requestAnimationFrame(this.update.bind(this));
      var now = Date.now();
      // The emitter requires the elapsed
      // number of seconds since the last update
      this.mEmitter.update((now - this.mElapsed) * 0.001);
      this.mElapsed = now;
    }
  }

  private onVisibilityChange(): void {
    const isVisible = !document.hidden;
    this.mLogger.Log("GameVisibility: " + (isVisible ? "yes" : "no"));
  }

  public getName() {
    return "GameSceneParticles";
  }

  public showFPS(): void {
    this.mTextFPS = Helper.getLabelWithBasicFont("FPS: ");
    this.mTextFPS.anchor.set(0.5, 0.5);
    this.mTextFPS.x = AppController.width - this.mTextFPS.width - 5;
    this.mTextFPS.y = this.mTextFPS.height / 2;
    this.mContainer.addChild(this.mTextFPS);
    this.mTextFPS.zIndex = 100;
  }

  public onDestry(): void {
    this.mIsGameStopped = true;
    this.mIsGameStopped;
    if (this.mEmitter) {
      this.mEmitter.destroy();
    }
    this.mContainer.destroy();
    this.mEmitter = null;
    this.removeAllListeners();
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.removeAllChildren();
  }
  public removeAllChildren(): void {
    this.removeChild();
    this.mContainer.removeChild();
  }
}
