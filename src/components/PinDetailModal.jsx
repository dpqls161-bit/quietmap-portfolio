// src/components/PinDetailModal.jsx
import React, { useState, useEffect } from "react";
import "../styles/pindetail.css";
import { fetchPinDetail, addTagToPin } from "../api/pins";

const PinDetailModal = ({ pinId, onClose }) => {
  const [photo, setPhoto] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pinId) return;

    const load = async () => {
      try {
        setLoading(true);

        const data = await fetchPinDetail(pinId);
        console.log("📌 받아온 핀 상세:", data);

      
        setPhoto(data.image_url ?? null);

        const tagArray = Array.isArray(data.tags)
          ? data.tags
          : (data.tags || "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);

        setTags(tagArray);

      } catch (err) {
        console.error("❌ 상세 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [pinId]);

  return (
    <div className="pin-modal-overlay">
      <div className="pin-modal">

        <button className="pin-modal-close" onClick={onClose}>✕</button>
        <h2>장소 정보</h2>

        {loading ? (
          <p>불러오는 중...</p>
        ) : (
          <>
            {/* 사진 */}
            {photo ? (
              <img src={photo} alt="핀 사진" className="pin-modal-photo" />
            ) : (
              <p>등록된 사진이 없습니다.</p>
            )}

            {/* 태그 목록 */}
            <div className="pin-modal-tags">
              {tags.length > 0 ? (
                tags.map((t, idx) => (
                  <span key={idx} className="pin-tag">#{t}</span>
                ))
              ) : (
                <p>등록된 태그 없음</p>
              )}
            </div>

            {/* 태그 추가 */}
            <div className="pin-modal-input-row">
              <input
                type="text"
                value={newTag}
                placeholder="태그 추가..."
                onChange={(e) => setNewTag(e.target.value)}
                disabled={saving}
              />
              <button
                onClick={async () => {
                  if (!newTag.trim()) return;
                  setTags((prev) => [...prev, newTag.trim()]);
                  setNewTag("");

                  setSaving(true);
                  await addTagToPin(pinId, newTag.trim());
                  setSaving(false);
                }}
                disabled={saving}
              >
                {saving ? "저장중..." : "추가"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PinDetailModal;

