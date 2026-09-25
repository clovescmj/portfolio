/**
 * Layout regression check, run from the browser console (or the preview
 * tool) on any page of the running dev server. No dependencies.
 *
 *   await layoutSnapshot("base")   // before a refactor: saves positions
 *   await layoutSnapshot("after")  // after: saves again
 *   layoutCompare("base", "after") // lists every page that moved
 *
 * Each page is loaded in a hidden 1440px iframe; the position and size of
 * every heading, paragraph, image, divider and embed is recorded. A
 * refactor that should not change the look must compare as identical.
 */
const LAYOUT_PAGES = [
  "/",
  "/about",
  "/work/loft-app",
  "/work/contract-template-management",
  "/work/third-party-claims",
  "/work/comms-map-skill",
  "/work/career-development-plan",
];

async function layoutSnapshot(key, width = 1440) {
  const out = {};
  for (const url of LAYOUT_PAGES) {
    const frame = document.createElement("iframe");
    frame.style.cssText = `position:fixed;left:0;top:0;width:${width}px;height:900px;opacity:0;pointer-events:none`;
    frame.src = url;
    document.body.appendChild(frame);
    await new Promise((resolve) => (frame.onload = resolve));
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const doc = frame.contentDocument;
    const scroller = doc.querySelector(".scroll-area");
    const boxes = [...doc.querySelectorAll("h1,h2,h3,h4,h5,h6,p,img,hr,iframe")]
      .filter((el) => !el.closest("nav,aside") && el.getBoundingClientRect().height > 0)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return [el.textContent.trim().slice(0, 24), Math.round(r.top + scroller.scrollTop), Math.round(r.left), Math.round(r.width), Math.round(r.height)];
      });
    out[url] = { height: scroller.scrollHeight, boxes };
    frame.remove();
  }
  localStorage.setItem(`layout_${key}`, JSON.stringify(out));
  return Object.fromEntries(Object.entries(out).map(([url, page]) => [url, `${page.height}px, ${page.boxes.length} boxes`]));
}

function layoutCompare(a, b, tolerance = 1) {
  const A = JSON.parse(localStorage.getItem(`layout_${a}`));
  const B = JSON.parse(localStorage.getItem(`layout_${b}`));
  const report = {};
  for (const url of Object.keys(A)) {
    const diffs = [];
    if (Math.abs(A[url].height - B[url].height) > tolerance) diffs.push(`height ${A[url].height} -> ${B[url].height}`);
    const n = Math.min(A[url].boxes.length, B[url].boxes.length);
    if (A[url].boxes.length !== B[url].boxes.length) diffs.push(`boxes ${A[url].boxes.length} -> ${B[url].boxes.length}`);
    for (let i = 0; i < n && diffs.length < 6; i++) {
      const [ta, ...pa] = A[url].boxes[i];
      const [tb, ...pb] = B[url].boxes[i];
      if (ta !== tb || pa.some((v, k) => Math.abs(v - pb[k]) > tolerance)) diffs.push(`#${i} "${ta}" ${pa} -> "${tb}" ${pb}`);
    }
    report[url] = diffs.length ? diffs : "identical";
  }
  return report;
}
