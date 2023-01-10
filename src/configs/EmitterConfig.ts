import { Texture } from "pixi.js";
import { GameConfig } from "./GameConfigs";

export class EmitterConfig {
  public static AWESOME_PARTICLE_EMITTER = {
    lifetime: {
      min: 0.8,
      max: 0.8,
    },
    particlesPerWave: 8,
    frequency: 0.2,
    emitterLifetime: 0.41,
    maxParticles: 200,
    addAtBack: false,
    pos: {
      x: 0,
      y: 0,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                time: 0,
                value: 0.8,
              },
              {
                time: 1,
                value: 0.7,
              },
            ],
          },
        },
      },
      {
        type: "movePath",
        config: {
          path: "cos(x/20)*20",
          speed: {
            list: [
              {
                time: 0,
                value: 150,
              },
              {
                time: 1,
                value: 100,
              },
            ],
          },
          minMult: 1,
        },
      },
      {
        type: "moveSpeedStatic",
        config: {
          min: 200,
          max: 200,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                time: 0,
                value: 1,
              },
              {
                time: 1,
                value: 0.3,
              },
            ],
          },
          minMult: 1,
        },
      },
      {
        type: "color",
        config: {
          color: {
            list: [
              {
                time: 0,
                value: "e3f9ff",
              },
              {
                time: 1,
                value: "0ec8f8",
              },
            ],
          },
        },
      },
      {
        type: "textureRandom",
        config: {
          textures: [Texture.from(GameConfig.ASSETS.emoji)],
        },
      },
      {
        type: "spawnBurst",
        config: {
          start: 0,
          spacing: 45,
          distance: 0,
        },
      },
    ],
  };
}
