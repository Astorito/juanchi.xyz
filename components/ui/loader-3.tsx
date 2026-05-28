"use client"

const CSS = `
  .jc-loader {
    width: 132px;
    height: 120px;
    position: relative;
    transform-style: preserve-3d;
  }
  .jc-loader .jc-box {
    width: 44px;
    height: 44px;
    position: absolute;
    transform-style: preserve-3d;
  }
  .jc-loader .jc-box > div {
    width: 44px;
    height: 44px;
    background: #ffffff;
    position: absolute;
  }

  /* Resting positions + per-box launch offsets */
  .jc-loader .b0 { top: 0px;  left: 88px; --bx:   0px; --by: -88px; }
  .jc-loader .b1 { top: 25px; left: 44px; --bx: -44px; --by: -44px; }
  .jc-loader .b2 { top: 25px; left: 88px; --bx:  44px; --by: -44px; }
  .jc-loader .b3 { top: 50px; left:  0px; --bx: -88px; --by:   0px; }
  .jc-loader .b4 { top: 50px; left: 44px; --bx:   0px; --by: -44px; }
  .jc-loader .b5 { top: 50px; left: 88px; --bx:  88px; --by:   0px; }
  .jc-loader .b6 { top: 75px; left: 22px; --bx: -44px; --by:  44px; }
  .jc-loader .b7 { top: 75px; left: 66px; --bx:  44px; --by:  44px; }

  /* move on .jc-box, scale+rotate on .jc-box > div */
  .jc-loader .b0 { animation: jc-move0 4.8s infinite; }
  .jc-loader .b1 { animation: jc-move1 4.8s infinite; }
  .jc-loader .b2 { animation: jc-move2 4.8s infinite; }
  .jc-loader .b3 { animation: jc-move3 4.8s infinite; }
  .jc-loader .b4 { animation: jc-move4 4.8s infinite; }
  .jc-loader .b5 { animation: jc-move5 4.8s infinite; }
  .jc-loader .b6 { animation: jc-move6 4.8s infinite; }
  .jc-loader .b7 { animation: jc-move7 4.8s infinite; }

  .jc-loader .b0 > div { animation: jc-scale0 4.8s infinite; }
  .jc-loader .b1 > div { animation: jc-scale1 4.8s infinite; }
  .jc-loader .b2 > div { animation: jc-scale2 4.8s infinite; }
  .jc-loader .b3 > div { animation: jc-scale3 4.8s infinite; }
  .jc-loader .b4 > div { animation: jc-scale4 4.8s infinite; }
  .jc-loader .b5 > div { animation: jc-scale5 4.8s infinite; }
  .jc-loader .b6 > div { animation: jc-scale6 4.8s infinite; }
  .jc-loader .b7 > div { animation: jc-scale7 4.8s infinite; }

  .jc-loader .jc-ground { position: absolute; inset: 0; transform-style: preserve-3d; }
  .jc-loader .jc-ground > div {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, #fff 0%, transparent 65%);
    opacity: 0;
    animation: jc-ground 4.8s infinite;
  }
  .jc-loader .jc-ground > div::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, #fff 0%, transparent 50%);
    opacity: 0;
    animation: jc-ground-shine 4.8s infinite;
  }

  @keyframes jc-move0 {
    0%       { transform: translate(0, 0); }
    12%      { transform: translate(var(--bx), var(--by)); }
    25%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes jc-move1 {
    0%       { transform: translate(0, 0); }
    16%      { transform: translate(var(--bx), var(--by)); }
    29%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes jc-move2 {
    0%       { transform: translate(0, 0); }
    20%      { transform: translate(var(--bx), var(--by)); }
    33%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes jc-move3 {
    0%       { transform: translate(0, 0); }
    24%      { transform: translate(var(--bx), var(--by)); }
    37%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes jc-move4 {
    0%       { transform: translate(0, 0); }
    28%      { transform: translate(var(--bx), var(--by)); }
    41%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes jc-move5 {
    0%       { transform: translate(0, 0); }
    32%      { transform: translate(var(--bx), var(--by)); }
    45%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes jc-move6 {
    0%       { transform: translate(0, 0); }
    36%      { transform: translate(var(--bx), var(--by)); }
    49%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }
  @keyframes jc-move7 {
    0%       { transform: translate(0, 0); }
    40%      { transform: translate(var(--bx), var(--by)); }
    53%, 52% { transform: translate(0, 0); }
    80%      { transform: translate(0, -32px); }
    90%,100% { transform: translate(0, 188px); }
  }

  @keyframes jc-scale0 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    6%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    14%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes jc-scale1 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    10%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    18%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes jc-scale2 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    14%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    22%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes jc-scale3 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    18%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    26%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes jc-scale4 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    22%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    30%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes jc-scale5 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    26%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    34%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes jc-scale6 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    30%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    38%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes jc-scale7 {
    0%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
    34%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    42%,100%  { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }

  @keyframes jc-ground {
    0%,65%   { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(0); }
    75%,90%  { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(1); }
    100%     { transform: rotateX(90deg) rotateY(0deg) translate(-48px,-120px) translateZ(100px) scale(0); }
  }
  @keyframes jc-ground-shine {
    0%,70%  { opacity: 0; }
    75%,87% { opacity: 0.2; }
    100%    { opacity: 0; }
  }
`

export function Loader3() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="jc-loader">
        <div className="jc-box b0"><div /></div>
        <div className="jc-box b1"><div /></div>
        <div className="jc-box b2"><div /></div>
        <div className="jc-box b3"><div /></div>
        <div className="jc-box b4"><div /></div>
        <div className="jc-box b5"><div /></div>
        <div className="jc-box b6"><div /></div>
        <div className="jc-box b7"><div /></div>
        <div className="jc-ground"><div /></div>
      </div>
    </>
  )
}
