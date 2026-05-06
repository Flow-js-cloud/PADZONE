"use client";

import { useRef, useState, DragEvent } from "react";
import Image from "next/image";
import { X, Loader2, ImagePlus, GripVertical, Link } from "lucide-react";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

const THUMB_DRAG_TYPE = "text/padzone-thumb";

export function ImageUploader({ value, onChange }: Props) {
  const inputRef   = useRef<HTMLInputElement>(null);
  const [loading,  setLoading]  = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error,    setError]    = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [showUrl,  setShowUrl]  = useState(false);

  // Réorganisation des miniatures
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  /* ── Upload fichiers ──────────────────────────────────────────── */
  const uploadFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (!arr.length) return;
    setLoading(true);
    setError("");
    const urls: string[] = [];
    try {
      for (const file of arr) {
        const fd = new FormData();
        fd.append("file", file);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: fd,
            headers: { "X-PadZone-Request": "1" },
            signal: controller.signal,
          });
          clearTimeout(timeout);
          const data = await res.json();
          if (data.url) urls.push(data.url);
          else setError(data.error ?? "Erreur d'upload");
        } catch (e) {
          clearTimeout(timeout);
          const msg = e instanceof Error && e.name === "AbortError"
            ? "Timeout — fichier trop lourd ou connexion lente"
            : "Erreur réseau lors de l'upload";
          setError(msg);
        }
      }
      if (urls.length) onChange([...value, ...urls]);
    } finally {
      setLoading(false);
    }
  };

  /* ── Drop zone (fichiers depuis le système) ───────────────────── */
  const onDropZoneDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Ne pas activer la zone si c'est une miniature qu'on déplace
    if (Array.from(e.dataTransfer.types).includes(THUMB_DRAG_TYPE)) return;
    setDragging(true);
  };

  const onDropZone = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (Array.from(e.dataTransfer.types).includes(THUMB_DRAG_TYPE)) return;
    uploadFiles(e.dataTransfer.files);
  };

  /* ── Drag-and-drop réorganisation des miniatures ──────────────── */
  const onThumbDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(THUMB_DRAG_TYPE, String(index));
    setDragIndex(index);
  };

  const onThumbDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (!Array.from(e.dataTransfer.types).includes(THUMB_DRAG_TYPE)) return;
    e.dataTransfer.dropEffect = "move";
    if (overIndex !== index) setOverIndex(index);
  };

  const onThumbDrop = (e: DragEvent<HTMLDivElement>, toIndex: number) => {
    e.preventDefault();
    const fromStr = e.dataTransfer.getData(THUMB_DRAG_TYPE);
    const fromIndex = parseInt(fromStr, 10);
    if (isNaN(fromIndex) || fromIndex === toIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const next = [...value];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    onChange(next);
    setDragIndex(null);
    setOverIndex(null);
  };

  const onThumbDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const remove = (url: string) => onChange(value.filter(u => u !== url));

  const addUrl = () => {
    const u = urlInput.trim();
    if (!u) return;
    if (!u.startsWith("http")) { setError("URL invalide (doit commencer par http)"); return; }
    onChange([...value, u]);
    setUrlInput("");
    setError("");
  };

  return (
    <div className="space-y-3">

      {/* Miniatures réorganisables */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {value.map((url, i) => {
            const isBeingDragged = dragIndex === i;
            const isDropTarget   = overIndex === i && dragIndex !== null && dragIndex !== i;
            return (
              <div
                key={url}
                draggable
                onDragStart={e => onThumbDragStart(e, i)}
                onDragOver={e => onThumbDragOver(e, i)}
                onDrop={e => onThumbDrop(e, i)}
                onDragEnd={onThumbDragEnd}
                className="relative group w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 select-none transition-all duration-150"
                style={{
                  border: isDropTarget
                    ? "2px solid #00e5ff"
                    : "1px solid #1e2a3a",
                  opacity: isBeingDragged ? 0.35 : 1,
                  cursor: "grab",
                  boxShadow: isDropTarget ? "0 0 0 2px rgba(0,229,255,0.25)" : undefined,
                  transform: isDropTarget ? "scale(1.04)" : undefined,
                }}
              >
                <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" unoptimized />

                {/* Poignée de déplacement */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.35)" }}>
                  <GripVertical size={20} color="rgba(255,255,255,0.8)" />
                </div>

                {/* Bouton supprimer */}
                <button
                  onClick={e => { e.stopPropagation(); remove(url); }}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  style={{ background: "#ef4444" }}>
                  <X size={10} color="#fff" />
                </button>

                {/* Badge "principale" sur la première photo */}
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] font-mono py-0.5 z-10"
                    style={{ background: "rgba(0,229,255,0.85)", color: "#000" }}>
                    principale
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {value.length > 1 && (
        <p className="text-[10px] font-mono" style={{ color: "#334155" }}>
          Glisse les photos pour changer l'ordre · la 1ʳᵉ est l'image principale
        </p>
      )}

      {/* Zone de drop fichiers */}
      <div
        onClick={() => !loading && inputRef.current?.click()}
        onDragOver={onDropZoneDragOver}
        onDragLeave={() => setDragging(false)}
        onDrop={onDropZone}
        className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl cursor-pointer transition-all"
        style={{
          background: dragging ? "rgba(0,229,255,0.06)" : "#0f1117",
          border: `2px dashed ${dragging ? "#00e5ff" : "#1e2a3a"}`,
        }}>
        {loading
          ? <Loader2 size={22} className="animate-spin" style={{ color: "#00e5ff" }} />
          : <ImagePlus size={22} style={{ color: dragging ? "#00e5ff" : "#475569" }} />
        }
        <p className="text-xs font-mono" style={{ color: loading ? "#00e5ff" : "#475569" }}>
          {loading ? "Upload en cours…" : "Clique ou glisse tes photos ici"}
        </p>
        <p className="text-[10px]" style={{ color: "#334155" }}>JPG, PNG, WEBP — plusieurs fichiers acceptés</p>
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => e.target.files && uploadFiles(e.target.files)} />

      {/* Toggle URL input */}
      <button
        type="button"
        onClick={() => { setShowUrl(v => !v); setError(""); }}
        className="flex items-center gap-1.5 text-xs font-mono transition-colors"
        style={{ color: showUrl ? "#00e5ff" : "#475569" }}
      >
        <Link size={12} />
        {showUrl ? "Masquer" : "Coller une URL d'image"}
      </button>

      {showUrl && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addUrl()}
            placeholder="https://i.imgur.com/..."
            className="flex-1 px-3 py-2 rounded-lg text-xs font-mono outline-none"
            style={{ background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" }}
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-3 py-2 rounded-lg text-xs font-mono font-bold"
            style={{ background: "#00e5ff", color: "#020209" }}
          >
            Ajouter
          </button>
        </div>
      )}

      {error && <p className="text-xs font-mono" style={{ color: "#ef4444" }}>{error}</p>}
    </div>
  );
}
