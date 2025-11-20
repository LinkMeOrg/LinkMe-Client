import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Modals({
  showShareModal,
  setShowShareModal,
  handleShare,
  showQRModal,
  setShowQRModal,
  profile,
  handleDownloadQR,
}) {
  return (
    <>
      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Share Profile</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-2">
              {navigator.share && (
                <button
                  onClick={() => handleShare("native")}
                  className="w-full flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Share via...</span>
                </button>
              )}

              <button
                onClick={() => handleShare("copy")}
                className="w-full flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500/30 to-gray-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-white font-semibold">Copy Link</span>
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="w-full flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-green-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                  </svg>
                </div>
                <span className="text-white font-semibold">WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="w-full flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-blue-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-700/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-white font-semibold">Facebook</span>
              </button>

              <button
                onClick={() => handleShare("twitter")}
                className="w-full flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-sky-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500/30 to-sky-700/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
                <span className="text-white font-semibold">Twitter</span>
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="w-full flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-blue-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/30 to-blue-800/30 flex items=center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <span className="text-white font-semibold">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl p-8 max-w-sm w-full border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(139, 92, 246, 0.3)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl mb-6">
              <QRCodeCanvas
                id="profile-qr"
                value={profile.profileUrl}
                size={256}
                level="H"
                includeMargin
              />
            </div>

            <button
              onClick={handleDownloadQR}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </>
  );
}
