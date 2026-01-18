"use client";

import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openPic, setOpenPic] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-green-500/30 bg-black/90 backdrop-blur">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto py-3 font-mono text-sm">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center gap-3 text-green-400">
              <span className="text-green-600">$</span>
              <span className="text-base sm:text-lg font-bold tracking-wide">
                archivist<span className="animate-pulse">_</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-5 text-green-400">
              <a
                href="https://github.com/raselahmedweb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition"
              >
                github
              </a>
              <a
                href="https://www.linkedin.com/in/raselahmedweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition"
              >
                linkedin
              </a>
              <a
                href="https://x.com/raselamedweb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition"
              >
                x
              </a>

              {/* Onclick Open Profile Picture */}
              <button
                onClick={() => setOpenPic((p) => !p)}
                className="flex items-center gap-2 border border-green-500/40 px-2 py-1 rounded"
              >
                <span className="text-green-600">{">"}</span>
                <img
                  src="https://avatars.githubusercontent.com/u/153086738?v=4"
                  alt="profile"
                  className="w-8 h-8 rounded"
                />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-end gap-2">
              <button
                onClick={() => setOpen(!open)}
                className=" text-green-400 border border-green-500/40 px-3 py-1 rounded hover:bg-green-500/10 transition"
              >
                MENU
              </button>
              {/* Onclick Open Profile Picture */}
              <button
                onClick={() => setOpenPic((p) => !p)}
                className="flex items-center gap-2 border border-green-500/40 px-2 py-1 rounded"
              >
                <span className="text-green-600">{">"}</span>
                <img
                  src="https://avatars.githubusercontent.com/u/153086738?v=4"
                  alt="profile"
                  className="w-8 h-8 rounded"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden mt-4 space-y-3 border-t border-green-500/20 pt-4 text-green-400">
              <a
                href="https://github.com/raselahmedweb"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-green-300"
              >
                github
              </a>
              <a
                href="https://www.linkedin.com/in/raselahmedweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-green-300"
              >
                linkedin
              </a>
              <a
                href="https://x.com/raselamedweb"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-green-300"
              >
                x
              </a>
            </div>
          )}
        </div>
      </header>
      {/* Open Profile Picture - Simplified version */}
      {openPic && (
        <div
          className="h-screen w-screen fixed flex justify-center items-center z-50 bg-black/75 top-0 left-0"
          onClick={() => setOpenPic(false)}
        >
          <div className="relative max-w-4xl w-full p-4">
            <div className="relative border-2 border-green-500/30 rounded-2xl overflow-hidden bg-black/90 backdrop-blur">
              <div className="p-8 flex flex-col items-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-green-500/50 animate-pulse"></div>
                  <img
                    src="https://avatars.githubusercontent.com/u/153086738?v=4"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-green-500/30"
                  />
                </div>
                <div className="text-center text-green-400">
                  <h2 className="text-2xl font-bold mb-2">Rasel Ahmed</h2>
                  <p className="text-green-300 mb-4">Full Stack Developer</p>
                  <div className="flex justify-center gap-4">
                    <a
                      href="https://github.com/raselahmedweb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-300 transition"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/raselahmedweb/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-300 transition"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/raselamedweb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-300 transition"
                    >
                      X/Twitter
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpenPic(false)}
                className="absolute top-4 right-4 text-green-400 hover:text-green-300 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
