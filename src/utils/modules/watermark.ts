// canvas水印
const initCanvas = ({
  withInvisible = true,
  content = '', // 水印内容
  width = 200, // 宽度
  height = 95, // 高度
  textAlign = 'left' as 'center' | 'end' | 'left' | 'right' | 'start', // 文字水平对齐方式
  textBaseline = 'bottom' as 'alphabetic' | 'bottom' | 'hanging' | 'ideographic' | 'middle' | 'top', // 文字基线对齐方式
  font = '20px Helvetica Neue', // 字体
  fillStyle = 'rgba(97, 102, 114, 0.075)', // 颜色
  rotate = -35, // 旋转角度
  zIndex = 10000000,
  container = document.body, // 水印容器
} = {}) => {
  const contentStr = content || 'watermark';
  const canvas = document.createElement('canvas');

  canvas.setAttribute('width', width.toString());
  canvas.setAttribute('height', height.toString());
  const ctx = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.translate(width * 0.1, height * 0.9);
  ctx.font = font;
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.save();

  // 绘制显形水印
  ctx.fillStyle = fillStyle;
  ctx.fillText(contentStr, 0, 0);
  ctx.save();

  // 绘制隐形水印
  if (withInvisible) {
    ctx.fillStyle = 'rgba(97, 102, 114, 0.005)';
    ctx.fillText(contentStr, 10, 25);
    ctx.save();
  }

  const base64Url = canvas.toDataURL();
  const watermarkDiv = document.createElement('div');

  watermarkDiv.setAttribute(
    'style',
    `
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:${zIndex};
            pointer-events:none;
            background-repeat:repeat;
            background-image:url('${base64Url}')
        `,
  );
  const containerElement = container;
  containerElement.style.position = 'relative';
  containerElement.insertBefore(watermarkDiv, containerElement.firstChild);

  // 防篡改
  watermarkDiv.addEventListener('DOMNodeRemoved', () => {
    location.reload();
  });
  const observer = new MutationObserver(() => {
    location.reload();
  });
  observer.observe(watermarkDiv, {
    attributes: true,
    childList: true,
  });
};

export { initCanvas };
