"use client"

const LOADER_CSS = `
  .ldr {
    --duration: 3s;
    --primary:       rgba(255, 255, 255, 1);
    --primary-light: #cccccc;
    --primary-rgba:  rgba(255, 255, 255, 0);
    width: 200px;
    height: 320px;
    position: relative;
    transform-style: preserve-3d;
  }

  /* Corner-trimming pseudo-elements — MUST match the page background (#000) */
  .ldr:before, .ldr:after {
    --r: 20.5deg;
    content: "";
    width: 320px;
    height: 140px;
    position: absolute;
    right: 32%;
    bottom: -11px;
    background: #000000;
    transform: translateZ(200px) rotate(var(--r));
    animation: ldr-mask var(--duration) linear forwards 1;
  }
  .ldr:after {
    --r: -20.5deg;
    right: auto;
    left: 32%;
  }

  /* Ground shadow */
  .ldr .ground {
    position: absolute;
    left: -50px;
    bottom: -120px;
    transform-style: preserve-3d;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
  }
  .ldr .ground div {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    width: 200px;
    height: 200px;
    background: var(--primary);
    background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
    transform-style: preserve-3d;
    animation: ldr-ground var(--duration) linear forwards 1;
  }
  .ldr .ground div:before, .ldr .ground div:after {
    --rx: 90deg; --ry: 0deg; --x: 44px; --y: 162px; --z: -50px;
    content: "";
    width: 156px;
    height: 300px;
    opacity: 0;
    background: linear-gradient(var(--primary), var(--primary-rgba));
    position: absolute;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    animation: ldr-ground-shine var(--duration) linear forwards 1;
  }
  .ldr .ground div:after {
    --rx: 90deg; --ry: 90deg; --x: 0; --y: 177px; --z: 150px;
  }

  /* Boxes — move on .box, scale on .box div */
  .ldr .box {
    --x: 0; --y: 0;
    position: absolute;
    animation: var(--duration) linear forwards 1;
    transform: translate(var(--x), var(--y));
  }
  .ldr .box div {
    background-color: var(--primary);
    width: 48px;
    height: 48px;
    position: relative;
    transform-style: preserve-3d;
    animation: var(--duration) ease forwards 1;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
  }
  .ldr .box div:before, .ldr .box div:after {
    --rx: 90deg; --ry: 0deg; --z: 24px; --y: -24px; --x: 0;
    content: "";
    position: absolute;
    background-color: inherit;
    width: inherit;
    height: inherit;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    filter: brightness(var(--b, 1.2));
  }
  .ldr .box div:after {
    --rx: 0deg; --ry: 90deg; --x: 24px; --y: 0; --b: 1.4;
  }

  /* Per-box position + animation assignment */
  .ldr .box.box0 { --x: -220px; --y: -120px; left: 58px;  top: 108px; animation-name: ldr-move0; }
  .ldr .box.box0 div { animation-name: ldr-scale0; }
  .ldr .box.box1 { --x: -260px; --y:  120px; left: 25px;  top: 120px; animation-name: ldr-move1; }
  .ldr .box.box1 div { animation-name: ldr-scale1; }
  .ldr .box.box2 { --x:  120px; --y: -190px; left: 58px;  top:  64px; animation-name: ldr-move2; }
  .ldr .box.box2 div { animation-name: ldr-scale2; }
  .ldr .box.box3 { --x:  280px; --y:  -40px; left: 91px;  top: 120px; animation-name: ldr-move3; }
  .ldr .box.box3 div { animation-name: ldr-scale3; }
  .ldr .box.box4 { --x:   60px; --y:  200px; left: 58px;  top: 132px; animation-name: ldr-move4; }
  .ldr .box.box4 div { animation-name: ldr-scale4; }
  .ldr .box.box5 { --x: -220px; --y: -120px; left: 25px;  top:  76px; animation-name: ldr-move5; }
  .ldr .box.box5 div { animation-name: ldr-scale5; }
  .ldr .box.box6 { --x: -260px; --y:  120px; left: 91px;  top:  76px; animation-name: ldr-move6; }
  .ldr .box.box6 div { animation-name: ldr-scale6; }
  .ldr .box.box7 { --x: -240px; --y:  200px; left: 58px;  top:  87px; animation-name: ldr-move7; }
  .ldr .box.box7 div { animation-name: ldr-scale7; }

  @keyframes ldr-move0 { 12% { transform: translate(var(--x), var(--y)); } 25%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale0 { 6% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 14%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
  @keyframes ldr-move1 { 16% { transform: translate(var(--x), var(--y)); } 29%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale1 { 10% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 18%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
  @keyframes ldr-move2 { 20% { transform: translate(var(--x), var(--y)); } 33%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale2 { 14% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 22%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
  @keyframes ldr-move3 { 24% { transform: translate(var(--x), var(--y)); } 37%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale3 { 18% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 26%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
  @keyframes ldr-move4 { 28% { transform: translate(var(--x), var(--y)); } 41%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale4 { 22% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 30%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
  @keyframes ldr-move5 { 32% { transform: translate(var(--x), var(--y)); } 45%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale5 { 26% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 34%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
  @keyframes ldr-move6 { 36% { transform: translate(var(--x), var(--y)); } 49%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale6 { 30% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 38%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
  @keyframes ldr-move7 { 40% { transform: translate(var(--x), var(--y)); } 53%, 52% { transform: translate(0,0); } 80% { transform: translate(0,-32px); } 90%, 100% { transform: translate(0,188px); } }
  @keyframes ldr-scale7 { 34% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 42%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }

  @keyframes ldr-ground {
    0%, 65%  { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(0); }
    75%, 90% { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(1); }
    100%     { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(0); }
  }
  @keyframes ldr-ground-shine {
    0%, 70%  { opacity: 0; }
    75%, 87% { opacity: 0.2; }
    100%     { opacity: 0; }
  }
  /* Mask: reveals assembled cube at 66% of the 3s cycle */
  @keyframes ldr-mask {
    0%, 65%   { opacity: 0; }
    66%, 100% { opacity: 1; }
  }
`

export function Loader3() {
  const boxes = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LOADER_CSS }} />
      <div className="ldr">
        {boxes.map(i => (
          <div key={i} className={`box box${i}`}>
            <div />
          </div>
        ))}
        <div className="ground"><div /></div>
      </div>
    </>
  )
}
