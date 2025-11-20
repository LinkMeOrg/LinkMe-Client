    import React, { useState, useEffect } from "react";
    import { Plus } from "lucide-react";

    // Match the exact ENUM from your Sequelize model
    const PLATFORM_ENUM = [
    { value: "website", label: "Website" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "github", label: "GitHub" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    ];

    export default function AddSocialLinkModal({
    isOpen,
    onClose,
    onAdd,
    existingPlatforms = [],
    }) {
    const [platform, setPlatform] = useState("");
    const [url, setUrl] = useState("");

    // Filter out platforms that already exist
    const availablePlatforms = PLATFORM_ENUM.filter(
        (p) => !existingPlatforms.includes(p.value)
    );

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
        setPlatform("");
        setUrl("");
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (platform && url) {
        onAdd(platform, url);
        setPlatform("");
        setUrl("");
        onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Social Link</h2>

            {availablePlatforms.length === 0 ? (
            <div className="text-center py-6">
                <p className="text-gray-600 mb-4">All platforms have been added!</p>
                <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-300"
                >
                Close
                </button>
            </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm font-semibold mb-2">
                    Platform
                </label>
                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                    required
                >
                    <option value="">Select Platform</option>
                    {availablePlatforms.map((p) => (
                    <option key={p.value} value={p.value}>
                        {p.label}
                    </option>
                    ))}
                </select>
                </div>
                <div>
                <label className="block text-sm font-semibold mb-2">
                    URL / Contact
                </label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm"
                    placeholder="Enter URL or contact info"
                    required
                />
                </div>
                <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-primary text-white flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Link
                </button>
                </div>
            </form>
            )}
        </div>
        </div>
    );
    }
