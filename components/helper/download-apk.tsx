"use client";

function DownloadApk({ statusClass }: { statusClass: string }) {
  const handleDownloadApk = () => {
    const link = document.createElement("a");
    link.href = "/app-release.apk";
    link.download = "app-release.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <button
      onClick={() => handleDownloadApk()}
      className="flex items-center gap-2 cursor-pointer"
    >
      <span className={`${statusClass} w-2 h-2 rounded-full`}></span>
      <span className="text-sm text-muted-foreground">Install</span>
    </button>
  );
}

export default DownloadApk;
