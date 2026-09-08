"use client";

import { useEffect } from "react";

const config = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1440,
  DENSITY_DISSIPATION: 0.5,
  VELOCITY_DISSIPATION: 3,
  PRESSURE: 0.1,
  PRESSURE_ITERATIONS: 20,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLOR_UPDATE_SPEED: 10,
};

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: { r: number; g: number; b: number };
}

function hslToRgb(h: number, s: number, l: number) {
  let r: number, g: number, b: number;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 6) % 6;
    return l - a * Math.max(Math.min(k, 4 - k, 1), -1);
  };
  r = f(0);
  g = f(8);
  b = f(4);
  return { r, g, b };
}

function generateColor(): { r: number; g: number; b: number } {
  const hue = Math.random();
  let { r, g, b } = hslToRgb(hue, 1, 1);
  r *= 0.15;
  g *= 0.15;
  b *= 0.15;
  return { r, g, b };
}

export function FluidBackground() {
  useEffect(() => {
    const canvas = document.getElementById("fluid") as HTMLCanvasElement;
    if (!canvas) return;

    // Set initial canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    let gl: WebGLRenderingContext;
    let ext: {
      formatRGBA: { internalFormat: number; format: number } | null;
      formatRG: { internalFormat: number; format: number } | null;
      formatR: { internalFormat: number; format: number } | null;
      halfFloatTexType: number;
      supportLinearFiltering: boolean;
    };

    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

    let isWebGL2 = false;
    const gl2 = canvas.getContext("webgl2", params) as any;
    isWebGL2 = !!gl2;
    if (isWebGL2) {
      gl = gl2;
      gl.getExtension("EXT_color_buffer_float");
      ext = {
        formatRGBA: { internalFormat: (gl as any).RGBA16F, format: gl.RGBA },
        formatRG: { internalFormat: (gl as any).RG16F, format: (gl as any).RG },
        formatR: { internalFormat: (gl as any).R16F, format: (gl as any).RED },
        halfFloatTexType: (gl as any).HALF_FLOAT,
        supportLinearFiltering: !!gl.getExtension("OES_texture_float_linear"),
      };
    } else {
      gl = (canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params)) as WebGLRenderingContext;
      if (!gl) return;
      const halfFloat = gl.getExtension("OES_texture_half_float");
      ext = {
        formatRGBA: { internalFormat: gl.RGBA, format: gl.RGBA },
        formatRG: { internalFormat: gl.RGBA, format: gl.RGBA },
        formatR: { internalFormat: gl.RGBA, format: gl.RGBA },
        halfFloatTexType: halfFloat ? halfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE,
        supportLinearFiltering: !!gl.getExtension("OES_texture_half_float_linear"),
      };
    }

    gl.clearColor(0, 0, 0, 1);

    const resolution = config.SIM_RESOLUTION;
    const dyeResolution = ext.supportLinearFiltering ? config.DYE_RESOLUTION : 256;
    const shading = ext.supportLinearFiltering ? config.SHADING : false;

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) {
        return { width: max, height: min };
      }
      return { width: min, height: max };
    }

    function scaleByPixelRatio(input: number) {
      return Math.floor(input * (window.devicePixelRatio || 1));
    }

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const texelSizeX = 1.0 / w;
      const texelSizeY = 1.0 / h;

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() { return fbo1; },
        set read(value) { fbo1 = value; },
        get write() { return fbo2; },
        set write(value) { fbo2 = value; },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    const vertexShaderSource = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    function compileShader(type: number, source: string, keywords?: string[]) {
      const shader = gl.createShader(type)!;
      let src = source;
      if (keywords) {
        src = keywords.map((k) => `#define ${k}\n`).join("") + src;
      }
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.trace(gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    function createProgram(vertexSource: string, fragmentSource: string, keywords?: string[]) {
      const program = gl.createProgram()!;
      const vs = compileShader(gl.VERTEX_SHADER, vertexSource);
      const fs = compileShader(gl.FRAGMENT_SHADER, fragmentSource, keywords);
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.trace(gl.getProgramInfoLog(program));
      }
      return program;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(program, i)!.name;
        uniforms[name] = gl.getUniformLocation(program, name);
      }
      return uniforms;
    }

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    function blit(target: { fbo: WebGLFramebuffer; width: number; height: number } | null) {
      if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    // Advection shader
    const advectionFragSource = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `;

    // Splat shader
    const splatFragSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    // Curl shader
    const curlFragSource = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `;

    // Vorticity shader
    const vorticityFragSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    // Divergence shader
    const divergenceFragSource = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    // Pressure shader
    const pressureFragSource = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    // Gradient subtract shader
    const gradientSubtractFragSource = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    // Clear shader
    const clearFragSource = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `;

    // Display shader with shading
    const displayFragSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform vec2 texelSize;
      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;
              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);
              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);
              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    // Advect shader
    const advectFragSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }
      void main () {
          #ifdef MANUAL_FILTERING
              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
              vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
              vec4 result = texture2D(uSource, coord);
          #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
    `;

    // Compile all programs
    const advectionProgram = createProgram(vertexShaderSource, advectionFragSource);
    const advectionUniforms = getUniforms(advectionProgram);

    const splatProgram = createProgram(vertexShaderSource, splatFragSource);
    const splatUniforms = getUniforms(splatProgram);

    const curlProgram = createProgram(vertexShaderSource, curlFragSource);
    const curlUniforms = getUniforms(curlProgram);

    const vorticityProgram = createProgram(vertexShaderSource, vorticityFragSource);
    const vorticityUniforms = getUniforms(vorticityProgram);

    const divergenceProgram = createProgram(vertexShaderSource, divergenceFragSource);
    const divergenceUniforms = getUniforms(divergenceProgram);

    const pressureProgram = createProgram(vertexShaderSource, pressureFragSource);
    const pressureUniforms = getUniforms(pressureProgram);

    const gradientSubtractProgram = createProgram(vertexShaderSource, gradientSubtractFragSource);
    const gradientSubtractUniforms = getUniforms(gradientSubtractProgram);

    const clearProgram = createProgram(vertexShaderSource, clearFragSource);
    const clearUniforms = getUniforms(clearProgram);

    const displayProgram = createProgram(vertexShaderSource, displayFragSource, shading ? ["SHADING"] : undefined);
    const displayUniforms = getUniforms(displayProgram);

    const advectProgram = createProgram(vertexShaderSource, advectFragSource, ext.supportLinearFiltering ? undefined : ["MANUAL_FILTERING"]);
    const advectUniforms = getUniforms(advectProgram);

    // Create FBOs
    const simRes = getResolution(config.SIM_RESOLUTION);
    const dyeRes = getResolution(dyeResolution);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA!;
    const rg = ext.formatRG!;
    const r = ext.formatR!;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    let dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    let velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, gl.NEAREST);
    const divergenceFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    const curlFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    let pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

    const pointers: Pointer[] = [];
    pointers.push({
      id: -1,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      down: false,
      moved: false,
      color: { r: 0, g: 0, b: 0 },
    });

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    function updatePointerDown(pointer: Pointer, posX: number, posY: number) {
      pointer.id = -1;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMove(pointer: Pointer, posX: number, posY: number) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function correctDeltaX(delta: number) {
      const aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number) {
      const aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function splatPointer(pointer: Pointer) {
      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function multipleSplats(amount: number) {
      for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= 10;
        color.g *= 10;
        color.b *= 10;
        const x = Math.random();
        const y = Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
      gl.useProgram(splatProgram);
      gl.uniform1i(splatUniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatUniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatUniforms.point, x, y);
      gl.uniform3f(splatUniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatUniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatUniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatUniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius: number) {
      const aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius /= aspectRatio;
      return radius;
    }

    function resizeCanvas() {
      const width = scaleByPixelRatio(canvas.clientWidth);
      const height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);

      // Curl
      gl.useProgram(curlProgram);
      gl.uniform2f(curlUniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlUniforms.uVelocity, velocity.read.attach(0));
      blit(curlFBO);

      // Vorticity
      gl.useProgram(vorticityProgram);
      gl.uniform2f(vorticityUniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityUniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityUniforms.uCurl, curlFBO.attach(1));
      gl.uniform1f(vorticityUniforms.curl, config.CURL);
      gl.uniform1f(vorticityUniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // Divergence
      gl.useProgram(divergenceProgram);
      gl.uniform2f(divergenceUniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceUniforms.uVelocity, velocity.read.attach(0));
      blit(divergenceFBO);

      // Clear pressure
      gl.useProgram(clearProgram);
      gl.uniform1i(clearUniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearUniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      // Pressure solve
      gl.useProgram(pressureProgram);
      gl.uniform2f(pressureUniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureUniforms.uDivergence, divergenceFBO.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureUniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // Gradient subtract
      gl.useProgram(gradientSubtractProgram);
      gl.uniform2f(gradientSubtractUniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradientSubtractUniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradientSubtractUniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // Advect velocity
      gl.useProgram(advectProgram);
      gl.uniform2f(advectUniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectUniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      }
      const velocityId = velocity.read.attach(0);
      gl.uniform1i(advectUniforms.uVelocity, velocityId);
      gl.uniform1i(advectUniforms.uSource, velocityId);
      gl.uniform1f(advectUniforms.dt, dt);
      gl.uniform1f(advectUniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // Advect dye
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(advectUniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      }
      gl.uniform1i(advectUniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectUniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectUniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }

    function render() {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      gl.useProgram(displayProgram);
      if (shading) {
        gl.uniform2f(displayUniforms.texelSize, 1.0 / gl.drawingBufferWidth, 1.0 / gl.drawingBufferHeight);
      }
      gl.uniform1i(displayUniforms.uTexture, dye.read.attach(0));
      blit(null);
    }

    let animationId: number;

    function animate() {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;

      if (resizeCanvas()) {
        const simRes = getResolution(config.SIM_RESOLUTION);
        const dyeRes = getResolution(dyeResolution);
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, gl.NEAREST);
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      }

      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1.0) {
        colorUpdateTimer = colorUpdateTimer % 1.0;
        for (const pointer of pointers) {
          pointer.color = generateColor();
        }
      }

      for (const pointer of pointers) {
        if (pointer.moved) {
          pointer.moved = false;
          splatPointer(pointer);
        }
      }

      step(dt);
      render();
      animationId = requestAnimationFrame(animate);
    }

    // Mouse events
    canvas.addEventListener("mousedown", (e) => {
      const pointer = pointers[0];
      updatePointerDown(pointer, scaleByPixelRatio(e.offsetX), scaleByPixelRatio(e.offsetY));
      const color = generateColor();
      color.r *= 10;
      color.g *= 10;
      color.b *= 10;
      const dx = 1000 * (Math.random() - 0.5);
      const dy = 1000 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    });

    canvas.addEventListener("mousemove", (e) => {
      const pointer = pointers[0];
      if (!pointer.down) return;
      updatePointerMove(pointer, scaleByPixelRatio(e.offsetX), scaleByPixelRatio(e.offsetY));
      splatPointer(pointer);
    });

    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        updatePointerDown(pointer, scaleByPixelRatio(touches[i].clientX), scaleByPixelRatio(touches[i].clientY));
      }
    });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        updatePointerMove(pointer, scaleByPixelRatio(touches[i].clientX), scaleByPixelRatio(touches[i].clientY));
        splatPointer(pointer);
      }
    });

    canvas.addEventListener("touchend", () => {
      pointers[0].down = false;
    });

    multipleSplats(Math.floor(Math.random() * 15) + 5);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas
        id="fluid"
        className="h-screen w-screen"
        style={{ pointerEvents: "auto" }}
      />
    </div>
  );
}
