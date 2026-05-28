"use client"

/* Self-contained — all CSS injected inline to bypass Tailwind processing */
const LOADER_CSS = `
  .ldr {
    width: 132px;
    height: 120px;
    position: relative;
    transform-style: preserve-3d;
    animation: ldr-mask 4.8s infinite;
  }

  /* ── box geometry ────────────────────────────────── */
  .ldr-box {
    width: 44px;
    height: 44px;
    position: absolute;
    transform-style: preserve-3d;
  }
  .ldr-box > div {
    width: 44px;
    height: 44px;
    background: #ffffff;
    position: absolute;
  }

  /* ── resting positions + launch offsets ─────────── */
  .ldr .b0 { top: 0px;  left: 88px; --lx:   0px; --ly: -88px; }
  .ldr .b1 { top: 25px; left: 44px; --lx: -44px; --ly: -44px; }
  .ldr .b2 { top: 25px; left: 88px; --lx:  44px; --ly: -44px; }
  .ldr .b3 { top: 50px; left:  0px; --lx: -88px; --ly:   0px; }
  .ldr .b4 { top: 50px; left: 44px; --lx:   0px; --ly: -44px; }
  .ldr .b5 { top: 50px; left: 88px; --lx:  88px; --ly:   0px; }
  .ldr .b6 { top: 75px; left: 22px; --lx: -44px; --ly:  44px; }
  .ldr .b7 { top: 75px; left: 66px; --lx:  44px; --ly:  44px; }

  /* ── move on parent, rotate+scale on child ─────── */
  .ldr .b0 { animation: ldr-move0 4.8s infinite; }
  .ldr .b1 { animation: ldr-move1 4.8s infinite; }
  .ldr .b2 { animation: ldr-move2 4.8s infinite; }
  .ldr .b3 { animation: ldr-move3 4.8s infinite; }
  .ldr .b4 { animation: ldr-move4 4.8s infinite; }
  .ldr .b5 { animation: ldr-move5 4.8s infinite; }
  .ldr .b6 { animation: ldr-move6 4.8s infinite; }
  .ldr .b7 { animation: ldr-move7 4.8s infinite; }

  .ldr .b0 > div { animation: ldr-scale0 4.8s infinite; }
  .ldr .b1 > div { animation: ldr-scale1 4.8s infinite; }
  .ldr .b2 > div { animation: ldr-scale2 4.8s infinite; }
  .ldr .b3 > div { animation: ldr-scale3 4.8s infinite; }
  .ldr .b4 > div { animation: ldr-scale4 4.8s infinite; }
  .ldr .b5 > div { animation: ldr-scale5 4.8s infinite; }
  .ldr .b6 > div { animation: ldr-scale6 4.8s infinite; }
  .ldr .b7 > div { animation: ldr-scale7 4.8s infinite; }

  /* ── ground shadow ──────────────────────────────── */
  .ldr-ground { position: absolute; inset: 0; transform-style: preserve-3d; }
  .ldr-ground > div {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, #ffffff 0%, transparent 65%);
    opacity: 0;
    animation: ldr-ground 4.8s infinite;
  }
  .ldr-ground > div::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, #ffffff 0%, transparent 50%);
    opacity: 0;
    animation: ldr-ground-shine 4.8s infinite;
  }

  /* ── move keyframes ─────────────────────────────── */
  @keyframes ldr-move0 {
    12%      { transform: translate(var(--lx), var(--ly)); }
    25%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes ldr-move1 {
    16%      { transform: translate(var(--lx), var(--ly)); }
    29%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes ldr-move2 {
    20%      { transform: translate(var(--lx), var(--ly)); }
    33%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes ldr-move3 {
    24%      { transform: translate(var(--lx), var(--ly)); }
    37%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes ldr-move4 {
    28%      { transform: translate(var(--lx), var(--ly)); }
    41%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes ldr-move5 {
    32%      { transform: translate(var(--lx), var(--ly)); }
    45%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes ldr-move6 {
    36%      { transform: translate(var(--lx), var(--ly)); }
    49%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes ldr-move7 {
    40%      { transform: translate(var(--lx), var(--ly)); }
    53%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }

  /* ── scale keyframes ────────────────────────────── */
  @keyframes ldr-scale0 {
    6%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    14%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes ldr-scale1 {
    10%      { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    18%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes ldr-scale2 {
    14%      { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    22%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes ldr-scale3 {
    18%      { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    26%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes ldr-scale4 {
    22%      { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    30%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes ldr-scale5 {
    26%      { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    34%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes ldr-scale6 {
    30%      { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    38%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes ldr-scale7 {
    34%      { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    42%,100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }

  /* ── ground + mask ──────────────────────────────── */
  @keyframes ldr-ground {
    0%,65%   { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(0); }
    75%,90%  { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(1); }
    100%     { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(0); }
  }
  @keyframes ldr-ground-shine {
    0%,70%  { opacity: 0; }
    75%,87% { opacity: 0.25; }
    100%    { opacity: 0; }
  }
  /* Mask: hides the whole loader while boxes assemble off-screen,
     then reveals the completed cube at 66% (≈ 3.17 s into 4.8 s cycle) */
  @keyframes ldr-mask {
    0%,65%   { opacity: 0; }
    66%,100% { opacity: 1; }
  }
`

export function Loader3() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LOADER_CSS }} />
      <div className="ldr">
        <div className="ldr-box b0"><div /></div>
        <div className="ldr-box b1"><div /></div>
        <div className="ldr-box b2"><div /></div>
        <div className="ldr-box b3"><div /></div>
        <div className="ldr-box b4"><div /></div>
        <div className="ldr-box b5"><div /></div>
        <div className="ldr-box b6"><div /></div>
        <div className="ldr-box b7"><div /></div>
        <div className="ldr-ground"><div /></div>
      </div>
    </>
  )
}
