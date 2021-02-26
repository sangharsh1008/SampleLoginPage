const screenshot = window.require("screenshot-desktop");

const { remote } = window.require("electron");

export const getScreenShotImage = calback => {
  const activeWindow = remote.BrowserWindow.getFocusedWindow();
  activeWindow.minimize();
  setTimeout(() => {
    screenshot()
      .then(imgBuffer => {
        let image = new Image();
        image.src = `data:image/png;base64, ${imgBuffer.toString("base64")}`;
        const windowSize = {
          width: 0,
          height: 0
        };
        image.onload = function() {
          windowSize.width = image.width;
          windowSize.height = image.height;
          window.resizeTo(image.width, image.height);
          console.log(imgBuffer, "imgBuffer", image);
          calback(
            `data:image/png;base64, ${imgBuffer.toString("base64")}`,
            windowSize
          );
        };
      })
      .catch(err => {
        console.error(err.message);
      });
    setTimeout(() => {
      activeWindow.restore();
    }, 0);
  }, 10);
};
