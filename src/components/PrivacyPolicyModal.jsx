import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  Shield,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  FileText,
  Database,
  Eye,
  UserCheck,
  Server,
  Key,
} from "lucide-react";
import axios from "axios";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isOpen) {
      fetchPrivacyPolicy();
    }
  }, [isOpen]);

  const fetchPrivacyPolicy = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/api/privacy-policy`);

      if (response.data.success) {
        setPolicyData(response.data.data);
      } else {
        setError("Failed to load privacy policy");
      }
    } catch (err) {
      console.error("Error fetching privacy policy:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load privacy policy. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col my-8 border border-gray-200">
        {/* Professional Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {policyData?.title || "Privacy Policy"}
                </h2>
                <p className="text-sm text-gray-600">
                  How we collect, use, and protect your personal information
                </p>
                {policyData?.version && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Version {policyData.version}
                    </span>
                    {policyData?.effectiveDate && (
                      <span className="text-xs text-gray-500">
                        Effective:{" "}
                        {new Date(policyData.effectiveDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">
                Loading Privacy Policy...
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Please wait while we retrieve the document
              </p>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Unable to Load Document
                  </h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={fetchPrivacyPolicy}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Retry Loading
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Privacy Commitment Banner */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Our Commitment to Your Privacy
                    </h3>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      We are committed to protecting your personal information
                      and maintaining transparency about our data practices.
                      This policy outlines how we collect, use, store, and
                      safeguard your data in compliance with applicable privacy
                      laws.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1.5">
                    End-to-End Encryption
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your data is encrypted both in transit and at rest using
                    industry-standard protocols
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1.5">
                    Full Transparency
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Clear information about what data we collect and how it's
                    used
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1.5">
                    You're in Control
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Complete control over your data with easy access, export,
                    and deletion options
                  </p>
                </div>
              </div>

              {/* Document Content */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div
                  className="prose prose-sm max-w-none p-8 leading-relaxed text-gray-700"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: policyData?.content
                      ?.replace(/\n\n/g, "</p><p class='mt-4'>")
                      .replace(/\n/g, "<br />")
                      .replace(/^/, "<p>")
                      .replace(/$/, "</p>")
                      .replace(
                        /#{1,6}\s*(.*?)(<br \/>|<\/p>)/g,
                        (match, title) => {
                          return `<h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">${title}</h3>`;
                        }
                      ),
                  }}
                />
              </div>

              {/* Contact & Support Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Privacy Questions or Concerns?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Our privacy team is here to help address any questions
                      about how we handle your data.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-2">
                    <Key className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Privacy Inquiries
                      </p>
                      <a
                        href="mailto:privacy@linkme.com"
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        privacy@linkme.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Database className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Data Requests
                      </p>
                      <a
                        href="mailto:data@linkme.com"
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        data@linkme.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Metadata */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                  <h3 className="font-semibold text-gray-900">
                    Document Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {policyData?.effectiveDate && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Effective Date:
                      </span>
                      <p className="text-gray-600 mt-0.5">
                        {new Date(policyData.effectiveDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
                  {policyData?.updatedAt && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Last Updated:
                      </span>
                      <p className="text-gray-600 mt-0.5">
                        {new Date(policyData.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
                  {policyData?.lastModifiedBy && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Modified By:
                      </span>
                      <p className="text-gray-600 mt-0.5">
                        {policyData.lastModifiedBy}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">
                      Policy Status:
                    </span>
                    <p className="text-gray-600 mt-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Currently Active
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    This privacy policy may be updated from time to time to
                    reflect changes in our practices or legal requirements. We
                    will notify you of any material changes via email or through
                    our platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between z-10">
          <p className="text-xs text-gray-500">
            Your privacy and data security are our top priorities
          </p>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {loading ? "Loading..." : "I Acknowledge"}
          </button>
        </div>
      </div>
    </div>
  );
}
