import { useEffect, useState } from 'react';

import SceneArt from './SceneArt.jsx';
import Skeleton from './Skeleton.jsx';
import Typewriter from './Typewriter.jsx';

export default function EndingScreen({ session, onContinue }) {
  const { ending, pending, genreId, tension, clues, allies, lastTone = 'arrival' } = session;
  const [textDone, setTextDone] = useState(false);
  const [twistRevealed, setTwistRevealed] = useState(false);

  useEffect(() => {
    setTextDone(false);
    setTwistRevealed(false);
  }, [ending]);

  useEffect(() => {
    if (!textDone || !ending) return undefined;
    const timer = window.setTimeout(() => setTwistRevealed(true), 500);
    return () => window.clearTimeout(timer);
  }, [textDone, ending]);

  if (pending || !ending) {
    return (
      <section className="screen screen--ending">
        <div className="ending__art">
          <SceneArt genreId={genreId} variant="panel" mood={lastTone} allyCount={allies.length} clueCount={clues.length} />
          <div className="art-frame__scrim" />
        </div>
        <p className="ending__kicker">Resolving…</p>
        <Skeleton seed={`${genreId}-ending`} lines={7} showOptions={false} />
        <p className="ending__hint">
          Weighing {clues.length || 'no'} clues, {allies.length || 'no'} allies and a tension of {tension}.
        </p>
      </section>
    );
  }

  return (
    <section className="screen screen--ending">
      <div className="ending__art">
        <SceneArt genreId={genreId} variant="panel" mood={lastTone} allyCount={allies.length} clueCount={clues.length} />
        <div className="art-frame__scrim" />
      </div>

      <p className="ending__kicker">Your ending</p>
      <h2 className="ending__title">{ending.title}</h2>

      <Typewriter text={ending.text} className="typewriter--ending" onComplete={() => setTextDone(true)} />

      <div className={`twist ${twistRevealed ? 'is-revealed' : ''}`}>
        <span className="twist__label">The twist</span>
        <p className="twist__text">{ending.twist}</p>
      </div>

      {ending.epilogue && <p className="ending__epilogue">{ending.epilogue}</p>}

      <div className="ending__actions">
        <button type="button" className="btn btn--primary" onClick={onContinue} disabled={!textDone}>
          {textDone ? 'Reveal my explorer profile' : 'Reading…'}
        </button>
      </div>
    </section>
  );
}
