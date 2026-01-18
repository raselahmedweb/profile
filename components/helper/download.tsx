"use client";

export const DownloadResume = () => {
  const link = document.createElement("a");
  link.href = "/rasel_resume.pdf";
  link.download = "rasel_resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
