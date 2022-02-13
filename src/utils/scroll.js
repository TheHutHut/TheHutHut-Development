const DATA_ATTR = "data-prevent-scroll";

const isBrowser = typeof window !== "undefined";
const isIOS =
  isBrowser && window.CSS && CSS.supports("-webkit-overflow-scrolling: touch");

export const isScrollAllowed = () =>
  document.body.getAttribute(DATA_ATTR) === null;

export const preventScroll = () => {
  if (isBrowser && isScrollAllowed()) {
    const body = document.body;
    const scrollTop = window.pageYOffset;
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;

    body.setAttribute(DATA_ATTR, true);

    if (isIOS) {
      if (scrollTop) {
        body.style.top = `-${scrollTop}px`;
      }
      body.style.position = "fixed";
      body.style.width = "100%";
    }
    body.style.overflow = "hidden";

    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }
  }
};

export const allowScroll = () => {
  if (isBrowser && !isScrollAllowed()) {
    const body = document.body;
    const scrollTop = Math.abs(parseInt(body.style.top || 0, 10));

    if (isIOS) {
      if (scrollTop) {
        body.style.removeProperty("top");
        window.scrollTo(0, scrollTop);
      }
      body.style.removeProperty("position");
      body.style.removeProperty("width");
    }

    body.style.removeProperty("overflow");
    body.style.removeProperty("padding-right");

    body.removeAttribute(DATA_ATTR);
  }
};

export default {
  allowScroll,
  isScrollAllowed,
  preventScroll,
};
