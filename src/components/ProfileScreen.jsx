import { useEffect, useRef, useState } from 'react';

import { getGenre } from '../engine/genres.js';
import { buildTextSummary, copyText, downloadEndingCard, renderEndingCard } from '../engine/endingCard.js';

export default function ProfileScreen({ session, onReplay, onNewGenre }) {
  const { profile, ending, genreId, seed, clues, allies, history, tension } = session;
  const previewRef = useRef(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const genre = getGenre(genreId);
  const payload = {
    genreId,
    ending,
    profile,
    seed,
    clues,
    allies,
    choices: history.map((h) => h.choiceMade),
    tension,
  };

  // Render the exact PNG that will be downloaded, so the preview is never a lie.
  useEffect(() => {
    if (!previewRef.current || !profile || !ending) return;
    try {
      const canvas = renderEndingCard(payload);
      const host = previewRef.current;
      host.innerHTML = '';
      canvas.className = 'card-preview__canvas';
      host.appendChild(canvas);
    } catch {
      setStatus('Card preview unavailable — the text summary below still works.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, ending, genreId]);

  const handleDownload = async () => {
    setBusy(true);
    const result = await downloadEndingCard(payload);
    setBusy(false);
    setStatus(
      result.ok
        ? 'Ending card saved to your downloads.'
        : 'Downloads are blocked here — use "Copy summary" instead.',
    );
  };

  const handleCopy = async () => {
    setBusy(true);
    const text = buildTextSummary(payload);
    const result = await copyText(text);
    setBusy(false);
    setStatus(result.ok ? 'Summary copied to your clipboard.' : 'Copy failed — select the summary text manually.');
  };

  return (
    <section className="screen screen--profile">
      <div className="profile-head">
        <p className="profile-head__kicker">Explorer profile</p>
        <h2 className="profile-head__title">{profile?.title}</h2>
        <p className="profile-head__tagline">{profile?.tagline}</p>
        <p className="profile-head__line">{profile?.line}</p>
        <p className="profile-head__note">{profile?.note}</p>
      </div>

      <div className="axes">
        {profile?.readout?.map((axis) => {
          const ratio = Math.max(-1, Math.min(1, axis.value / 6));
          const width = Math.abs(ratio) * 50;
          return (
            <div className="axis" key={axis.axis}>
              <span className="axis__name">{axis.label.question}</span>
              <span className="axis__track">
                <span className="axis__mid" />
                <span
                  className={`axis__fill ${ratio >= 0 ? 'is-positive' : 'is-negative'}`}
                  style={{ width: `${Math.max(width, 1.5)}%`, [ratio >= 0 ? 'left' : 'right']: '50%' }}
                />
              </span>
              <span className="axis__lean">{axis.lean}</span>
            </div>
          );
        })}
      </div>

      <div className="card-preview">
        <div className="card-preview__frame" ref={previewRef} aria-label="Your shareable ending card" />
        <div className="card-preview__side">
          <h3 className="card-preview__title">{ending?.title}</h3>
          <p className="card-preview__twist">{ending?.twist}</p>

          <dl className="stats">
            <div>
              <dt>Genre</dt>
              <dd>{genre?.name}</dd>
            </div>
            <div>
              <dt>Seed</dt>
              <dd>{seed?.code} #{seed?.number}</dd>
            </div>
            <div>
              <dt>Tension</dt>
              <dd>{tension}</dd>
            </div>
            <div>
              <dt>Decisions</dt>
              <dd>{history.length}</dd>
            </div>
          </dl>

          <ol className="choice-list">
            {history.map((entry, index) => (
              <li key={`${entry.round}-${index}`}>
                <span className="choice-list__round">{entry.roundLabel}</span>
                <span className="choice-list__text">{entry.choiceMade}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="profile-actions">
        <button type="button" className="btn btn--primary" onClick={handleDownload} disabled={busy}>
          Download ending card (PNG)
        </button>
        <button type="button" className="btn" onClick={handleCopy} disabled={busy}>
          Copy summary
        </button>
        <button type="button" className="btn btn--ghost" onClick={onReplay}>
          Replay
        </button>
        <button type="button" className="btn btn--ghost" onClick={onNewGenre}>
          Try another genre
        </button>
      </div>

      {status && (
        <p className="profile-status" role="status">
          {status}
        </p>
      )}

      <details className="summary-plain">
        <summary>Plain-text summary</summary>
        <pre>{buildTextSummary(payload)}</pre>
      </details>
    </section>
  );
}
