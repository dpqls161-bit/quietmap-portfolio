// src/components/PinDetailModal.jsx
import React, { useState, useEffect } from "react";
import "../style/pindetail.css";
import { fetchPinDetail, addTagToPin } from "../api/pins";

const PinDetailModal = ({ pinId, onClose }) => {
  const [photo, setPhoto] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // 📌 pinId 변경 → 상세 조회
  useEffect(() => {
    if (!pinId) return;

    const load = async () => {
      try {
        setLoading(true);

        const data = await fetchPinDetail(pinId);
        console.log("📌 핀 상세:", data);

        // 사진 URL
        setPhoto(data.image_url || "");

        // 태그 처리
        let arr = [];
        if (Array.isArray(data.tags)) {
          arr = data.tags;
        } else if (typeof data.tags === "string" && data.tags.trim() !== "") {
          arr = data.tags.split(",").map((t) => t.trim());
        }
        setTags(arr);
      } catch (err) {
        console.error("❌ 상세 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [pinId]);

  // 📌 태그 추가
  const handleAddTag = async () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;

    setTags((prev) => [...prev, trimmed]);
    setNewTag("");

    try {
      setSaving(true);
      await addTagToPin(pinId, trimmed);
    } catch (err) {
      console.error("❌ 태그 저장 실패:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pin-modal-overlay">
      <div className="pin-modal">
        <button className="pin-modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>장소 정보</h2>

        {loading && <p>불러오는 중...</p>}

        {!loading && (
          <>
            {/* 사진 */}
            {photo && (
              <img src={photo} alt="핀 사진" className="pin-modal-photo" />
            )}

            {/* 태그 목록 */}
            <div className="pin-modal-tags">
              {tags.map((t, idx) => (
                <span key={idx} className="pin-tag">#{t}</span>
              ))}
            </div>

            {/* 태그 입력 */}
            <div className="pin-modal-input-row">
              <input
                type="text"
                value={newTag}
                placeholder="태그 추가..."
                onChange={(e) => setNewTag(e.target.value)}
                disabled={saving}
              />
              <button onClick={handleAddTag} disabled={saving}>
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
