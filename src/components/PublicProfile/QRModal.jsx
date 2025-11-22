import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { X, Download } from "lucide-react";

export default function QRModal({ isOpen, onClose, profile, onDownload }) {
  if (!isOpen || !profile) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
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
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
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
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          <Download className="w-5 h-5" />
          Download QR Code
        </button>
      </div>
    </div>
  );
}
