const videos = Array.from(document.querySelectorAll(".managed-video"));

function playVideo(video) {
  const shell = video.closest(".page-shell");
  if (!shell) return;

  shell.classList.remove("ended");

  try {
    video.currentTime = 0;
  } catch (e) {}

  const p = video.play();
  if (p && typeof p.catch === "function") {
    p.catch(() => {});
  }
}

function stopVideo(video) {
  const shell = video.closest(".page-shell");
  if (!shell) return;

  video.pause();
}

videos.forEach((video) => {
  const shell = video.closest(".page-shell");
  if (!shell) return;

  video.addEventListener("ended", () => {
    shell.classList.add("ended");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const shell = video.closest(".page-shell");
      if (!shell) return;

      if (entry.isIntersecting) {
        playVideo(video);
      } else {
        stopVideo(video);
      }
    });
  },
  { threshold: 0.6 }
);

videos.forEach((video) => observer.observe(video));
