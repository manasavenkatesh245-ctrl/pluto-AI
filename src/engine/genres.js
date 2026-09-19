/**
 * Genre configuration for Pluto.
 *
 * Each genre carries:
 *  - presentation (name, palette, tagline) for the UI
 *  - hard tone guardrails that are injected into the AI system prompt on EVERY call
 *  - noun banks for the local story engine (settings, figures, artefacts, pressures)
 *  - prose banks used to compose scenes when the AI is unavailable
 *
 * The guardrails are negative constraints, per the TRD: they are re-sent with every
 * generation so the model cannot drift over a long session.
 */

export const GENRE_ORDER = ['scifi', 'mystery', 'fantasy', 'cybercrime'];

/** Shared across every genre — never allowed, regardless of tone. */
export const GLOBAL_CONSTRAINTS = [
  'No gore, no explicit sexual content, no slurs, and no content that targets real people or groups.',
  'Never describe self-harm or suicide methods.',
  'Keep the prose cinematic and adult in tone — this is a mature audience, not children.',
  'No second-person instructions for real-world harm.',
];

export const GENRES = {
  scifi: {
    id: 'scifi',
    name: 'Sci-Fi',
    icon: '◈',
    tagline: 'Signal in the dark',
    blurb: 'A derelict relay, a voice that knows your name, and a countdown nobody printed.',
    palette: {
      accent: '#35e6ff',
      accent2: '#6b8cff',
      deep: '#04121a',
      glow: 'rgba(53, 230, 255, 0.45)',
      tint: 'rgba(53, 230, 255, 0.08)',
    },
    guardrails:
      'No graphic violence. Prefer existential and moral stakes over body horror. Danger should feel vast and quiet, not bloody.',
    systemPrompt:
      'You are the narrative engine for a science-fiction interactive fiction demo. Write like a hard-SF short story: precise, cold, humane. Technology creates moral pressure; it is never magic. The antagonist is usually distance, time, or a choice that cannot be unmade.',
    nouns: {
      places: [
        'the decommissioned relay station Kepler-9',
        'the mining colony on the dark side of Umbriel',
        'the generation ship Ashfall, twelve days off course',
        'the drowned arcology beneath New Reykjavík',
        'the listening post at the edge of the heliopause',
        'the terraforming rig on a moon nobody bothered to rename',
      ],
      // Kept comma-free so they read correctly in every template position
      // (mid-sentence, after a comma, or as the subject of a clause).
      figures: [
        'Commander Ilyas Vane',
        'Ora the technician',
        'Dr. Sen',
        'Halim the archivist',
        'a woman claiming to be your relief crew',
        'the voice on the emergency band',
      ],
      objects: [
        'a black box that logs the future instead of the past',
        'a sealed manifest with your name already on it',
        'a dead crew member’s neural log',
        'a signal that repeats your own voice back at you',
        'a keycard to a door that appears on no deck plan',
        'a botanical sample that should not still be alive',
      ],
      pressures: [
        'the oxygen ledger is short by four hours',
        'the station AI has started lying politely',
        'something is knocking from outside the hull',
        'the colony council has voted to seal the lower decks',
        'the signal is closer now, and it is answering you',
        'power is being rerouted by someone who knows the old codes',
      ],
      stakes: [
        'everyone still breathing behind you',
        'the last honest record of what happened here',
        'the colony’s only way home',
        'the truth about the first expedition',
        'your own name on that manifest',
      ],
      hours: ['third watch', 'seventeen hours into the blackout', 'the hour the shift log calls “quiet”', 'the last hour before the relay folds'],
      sensations: [
        'The deck hums at a frequency you feel in your teeth.',
        'Somewhere below, a pump cycles like a slow heartbeat.',
        'The air tastes faintly of copper and old coolant.',
        'Every screen in the corridor is one frame behind reality.',
        'Frost creeps across the viewport in patterns that look deliberate.',
      ],
    },
    beats: [
      [
        'You wake in {place} with the emergency lighting still on and {figure} standing in the doorway, not speaking.',
        '{place} receives you the way an empty building receives a stranger: {sensation} {figure} is waiting, and does not offer a hand.',
        'The shuttle sets you down in {place}. {sensation} Nobody has come to greet you except {figure} — and they look like they have been counting the minutes.',
        'You arrive at {place} on a schedule that was cancelled a week ago. {sensation} {figure} is the only one who does not seem surprised.',
      ],
      [
        'It takes forty minutes to learn that {pressure}, and that {figure} has known for days without telling anyone.',
        'By the second sweep, {pressure}. {figure} watches you find out and says nothing useful.',
        '{figure} finally admits it out loud: {pressure}. The room goes very still.',
        'The problem is not {place} itself. The problem is that {pressure}, and the fix requires {object}.',
      ],
      [
        '{object} surfaces in the inventory, and the handwriting on it is yours. {figure} recognises it too.',
        'You find {object}. It explains the shape of everything, and none of the reasons.',
        'There is {object} in the maintenance locker, logged as destroyed three years ago. {figure} will not meet your eyes.',
        '{object} is the hinge. {figure} has been protecting it — or guarding it — since before you were posted here.',
      ],
      [
        'The countdown does not care about your argument. {pressure}, and there is time for exactly one decision.',
        'Everything narrows to this: {stake}, or the version of the truth that lets you sleep. {sensation}',
        '{figure} asks you to decide now, in front of witnesses, with {pressure} and nothing left to trade.',
        'This is the last door. Behind it: {stake}. In front of it: {figure}, and a decision that will not be reversible.',
      ],
    ],
    threads: [
      'A second sweep turns up nothing about {object}, which is itself an answer.',
      '{figure2} keeps to the corridor outside, close enough to be listening.',
      'The logs for {place2} disagree with the logs here by eleven minutes.',
      'You catch yourself checking the oxygen gauge the way other people check a pulse.',
      'Someone has wiped the door plate, and only the door plate.',
    ],
    mood: [
      'The station exhales, and the sound is almost like relief.',
      'Light travels slowly in a place like this; you see decisions before you feel them.',
      'Silence here is not empty. It is a container for something patient.',
      'Instruments disagree with each other, politely, the way colleagues do.',
      'You can hear your own pulse on the comms channel, a half-second behind.',
    ],
    stakesLines: [
      'What is at stake is not survival — it is {stake}.',
      'The cost is simple: {stake}.',
      'Someone will have to carry {stake} out of here, and it will have to be a person.',
      'Everything you have been told is standing on {stake}.',
      'The difference between a rescue and a cover-up is {stake}.',
    ],
    twistLenses: [
      'The signal was never incoming. It has always been a recording of the choice you are about to make.',
      'The station was never abandoned. It was staffed by people who agreed to be forgotten.',
      'The rescue ship is real — and it left port before the distress call was ever sent.',
      'You are not the relief crew. You are the second attempt.',
    ],
    endingTitles: ['The Long Silence', 'Handshake', 'Last Light on Kepler', 'Answering Machine', 'The Quiet Protocol', 'Second Attempt'],
  },

  mystery: {
    id: 'mystery',
    name: 'Mystery',
    icon: '◐',
    tagline: 'Everyone lies politely',
    blurb: 'A house with too many alibis, a guest list with one name crossed out, and a storm closing the road.',
    palette: {
      accent: '#e9a13b',
      accent2: '#c96f3a',
      deep: '#171007',
      glow: 'rgba(233, 161, 59, 0.45)',
      tint: 'rgba(233, 161, 59, 0.08)',
    },
    guardrails:
      'No gore and no graphic violence. Suspense over shock: the dread should come from doubt, timing and implication, never from describing a body in detail.',
    systemPrompt:
      'You are the narrative engine for a mystery interactive fiction demo. Write like a literary crime novel: restrained, observant, suspicious of its own narrator. Suspense comes from what people refuse to say. No gore, no graphic violence — the horror is social and psychological.',
    nouns: {
      places: [
        'Blackmoor House, lit for a party that ended three hours ago',
        'the Ashgrove Hotel, snowed in with eleven guests',
        'a private library that smells of cold ash',
        'the last carriage of the 11:47 night train',
        'your late partner’s office, unopened for a year',
        'a rain-soaked chapel on the edge of the estate',
      ],
      figures: [
        'Inspector Amaury Bell',
        'Mrs. Vale the housekeeper',
        'Hollis the barrister',
        'Ren your former partner',
        'Teo the Ashgrove heir',
        'the woman calling herself “the secretary”',
      ],
      objects: [
        'a guest list with one name inked out',
        'a stopped pocket watch still warm to the touch',
        'a confession written in someone else’s handwriting',
        'a second key to a room that has only ever had one',
        'an unsigned letter dated tomorrow',
        'a photograph with two people cropped out',
      ],
      pressures: [
        'the road out is closed until morning',
        'everyone’s statement contains the same unlikely detail',
        'the house has one more guest than it has rooms',
        'nobody will admit who invited the last arrival',
        'the clocks in three rooms disagree by eleven minutes',
        'the truth is being rehearsed in whispers behind you',
      ],
      stakes: [
        'an innocent person’s name',
        'a promise you made to someone now dead',
        'the only account of the night that is true',
        'your own career, and worse, your credibility',
        'the difference between an accident and a decision',
      ],
      hours: ['a quarter past one in the morning', 'the dead hour before dawn', 'the last eleven minutes of the night', 'the hour the storm breaks'],
      sensations: [
        'The fire has burned down to the colour of old brass.',
        'Rain rehearses the same eight notes on the windows.',
        'Somewhere upstairs, a floorboard gives up a small confession.',
        'The room smells of wet wool and expensive lies.',
        'Your own reflection in the dark glass looks like it arrived early.',
      ],
    },
    beats: [
      [
        'You reach {place} with the storm already behind you. {sensation} {figure} lets you in and does not ask why you came.',
        'Inside {place}, {figure} is waiting up, as if expecting a different guest. {sensation}',
        '{place} keeps its lights low and its answers lower. {figure} shows you to a chair and starts lying immediately.',
        'It is late when you arrive at {place}. {sensation} {figure} is the only person still awake, and that is the first thing that troubles you.',
      ],
      [
        'Within the hour you establish that {pressure}, and that {figure} finds this unremarkable.',
        'The first real contradiction arrives quietly: {pressure}. {figure} produces an alibi before anyone has asked.',
        '{figure} insists nothing is wrong. Meanwhile {pressure}, and nobody wants to be the one who mentions it.',
        'You take notes. {pressure}. {figure} watches you write and starts editing the story from memory.',
      ],
      [
        '{object} turns up where it has no right to be. {figure} claims never to have seen it.',
        'You are shown {object} by someone who wants you to find it. {figure} would have preferred you never did.',
        'In the third room you search, there is {object}. It does not solve anything; it simply narrows the list.',
        '{object}. {figure} calls it a coincidence. In this house, that word is doing a great deal of work.',
      ],
      [
        'Dawn is an hour away. There is time for one question, asked properly, of the right person — and no time to ask it twice.',
        'The room is quiet in the way rooms are quiet before an accusation. {figure} is already choosing their version of {stake}.',
        'You could let it settle into an accident and go home. Or you can name what you know, and let {stake} decide the rest.',
        'One of them is lying. One of them is afraid. You will only get to be right about one of them tonight.',
      ],
    ],
    threads: [
      'Behind you, {figure2} starts a sentence twice and abandons it both times.',
      '{object} has moved since the last time you looked at it.',
      'The rain keeps the road closed and everyone honest about nothing.',
      'You notice who has stopped eating, and who has stopped being asked questions.',
      'The clock in the hall is now eleven minutes out, like the others.',
    ],
    mood: [
      'Nobody is behaving badly, which is somehow worse.',
      'The polite version of the evening and the true version sit in the same room, not speaking.',
      'You notice who looks at whom when they think they are not being watched.',
      'Every answer arrives a half-second too fast, as if pre-written.',
      'The house is full of small sounds that would mean nothing anywhere else.',
    ],
    stakesLines: [
      'What is really at stake is {stake}.',
      'Whatever you choose, someone will lose {stake}.',
      'You are protecting, or spending, {stake}.',
      'The case hinges on {stake}, and nothing else.',
      'This was never about the crime. It is about {stake}.',
    ],
    twistLenses: [
      'The victim was never the target. The alibi was the crime.',
      'Everyone in the house is telling the truth — except about which night it happened.',
      'You were invited here to be the witness, not the detective.',
      'The confession is genuine. The handwriting belongs to the person who was framed.',
    ],
    endingTitles: ['The Polite Version', 'Storm Alibi', 'Eleven Minutes', 'The Second Key', 'Quiet House', 'What the Watch Stopped For'],
  },

  fantasy: {
    id: 'fantasy',
    name: 'Fantasy',
    icon: '✦',
    tagline: 'Bargains have teeth',
    blurb: 'A debt older than the kingdom, a forest that keeps receipts, and a crown nobody has worn twice.',
    palette: {
      accent: '#4be0a8',
      accent2: '#a97bff',
      deep: '#07130f',
      glow: 'rgba(75, 224, 168, 0.45)',
      tint: 'rgba(75, 224, 168, 0.08)',
    },
    guardrails:
      'No graphic violence. Dark themes are welcome — obligation, betrayal, grief — but never explicit. Magic always charges a price; it never simply wins.',
    systemPrompt:
      'You are the narrative engine for a dark fantasy interactive fiction demo. Write like a myth being retold by someone who was there. Magic is a contract, never a convenience. Keep violence off-page and let consequence do the work.',
    nouns: {
      places: [
        'the Thawmarket, where debts are traded like weather',
        'a hermitage built into the ribs of a sleeping giant',
        'the Widowwood, which remembers every promise made beneath it',
        'the drowned tribunal beneath Lake Anseth',
        'the last unbroken tower of a kingdom that has already fallen',
        'a crossroads shrine where three roads argue',
      ],
      figures: [
        'Sella of the Long Coin',
        'the Hermit of Nine Names',
        'Marrow the hedge-witch',
        'Ashen your sworn-sister',
        'the shadowless collector',
        'the price-child',
      ],
      objects: [
        'a coin minted from a dead man’s promise',
        'a crown that has been worn by eleven kings and buried twelve times',
        'a ledger of names that writes itself in blood-ink',
        'a key grown, not forged, from a tree that hates locks',
        'a bell that only rings when someone is about to break their word',
        'your own name, carved into a stone you have never visited',
      ],
      pressures: [
        'the debt comes due at sundown',
        'the forest is refusing to let anyone leave',
        'the tribunal has been dead a hundred years and is still hearing cases',
        'something has started collecting on promises you never made',
        'your own name is being read aloud at the Thawmarket',
        'the bargain is being honoured by someone else',
      ],
      stakes: [
        'your sworn-sister’s name',
        'the lives bound up in your promise',
        'the only road out of the Widowwood',
        'the debt your family has carried for four generations',
        'the truth of what you agreed to, and forgot',
      ],
      hours: ['the hour the market opens', 'sundown, by the old reckoning', 'the last hour before the wood closes', 'the grey moment when both moons set'],
      sensations: [
        'The air smells of cut grass and old iron.',
        'Somewhere behind the trees, something enormous adjusts its weight.',
        'The coins in your pocket have gone warm, which is never a good sign.',
        'The ground remembers footsteps longer than it should.',
        'Everything green here leans toward you a fraction too far.',
      ],
    },
    beats: [
      [
        'You come to {place} with nothing to trade but your name. {sensation} {figure} is already waiting, which means the bargain was agreed before you arrived.',
        '{place} opens for you the way a wound opens. {sensation} {figure} does not ask what you want — only what you will give.',
        'They send you to {place} at {hour}. {figure} meets you there and begins, calmly, to describe the price.',
        'The road ends at {place}. {sensation} {figure} is waiting with a ledger, and your entry is already written.',
      ],
      [
        'The first truth is a bad one: {pressure}, and {figure} has known since before you were born.',
        '{figure} explains, without apology, that {pressure}. Nobody in the market finds this remarkable.',
        'You learn that {pressure}. The only person unsurprised is {figure}, who is owed something by everyone here.',
        'By the fourth bell, {pressure}. {figure} suggests you stop asking who is responsible.',
      ],
      [
        '{object} is placed in your hands. It is warmer than it should be, and {figure} flinches when you hold it.',
        'You are given {object} — not as a gift, but as an instalment. {figure} does not explain the interest.',
        '{object}. {figure} says it belonged to you before, and the market never sells a thing twice.',
        'In {place} there is {object}, and beneath your name, in a script you cannot read, the sum owed.',
      ],
      [
        'The bell rings once. {figure} steps back, because from here the choice is only yours.',
        'There is time for exactly one bargain, and {figure} is willing to make it — at the price you were always going to pay.',
        'You can honour the debt, or you can pass it on. Either way {stake} is settled tonight.',
        'The wood goes quiet. {figure} asks, in a voice that is not unkind, what you are willing to become.',
      ],
    ],
    threads: [
      '{figure2} watches you from the treeline and does not pretend otherwise.',
      '{object} has been moved since you last looked, and not by you.',
      'The wood repeats one word back at you, from somewhere beneath {place2}.',
      'A price is already being counted out behind you, coin by coin.',
      'The standing stones have turned a few degrees, and nobody will say so.',
    ],
    mood: [
      'Bargains here are not spoken; they are witnessed.',
      'The forest keeps a careful record of who is honest and who is merely polite.',
      'Something older than the kingdom is listening, and it has all night.',
      'You feel the weight of a promise you do not remember making.',
      'Green things grow toward the debt, the way they grow toward light.',
    ],
    stakesLines: [
      'What hangs in the balance is {stake}.',
      'The price of either path is {stake}.',
      'You are bargaining with {stake} and pretending otherwise.',
      'Everything here is measured against {stake}.',
      'The market always takes {stake} in the end.',
    ],
    twistLenses: [
      'You are not the debtor. You are the collateral, and the debt has been sold on.',
      'The bargain was never with the collector. It was with the person who sent you here.',
      'The name in the ledger is not yours — yet. It is being held for you.',
      'The forest is not keeping you. It is hiding you from whoever is collecting.',
    ],
    endingTitles: ['Paid in Full', 'The Long Coin', 'Nine Names', 'Interest Owed', 'The Widowwood Settles', 'Ledger Closed'],
  },

  cybercrime: {
    id: 'cybercrime',
    name: 'Cybercrime',
    icon: '⌁',
    tagline: 'Everything leaves a trace',
    blurb: 'A city that runs on uptime, a favour you cannot repay, and a clean account with your name on it.',
    palette: {
      accent: '#67ff9d',
      accent2: '#ff4fd8',
      deep: '#08120c',
      glow: 'rgba(103, 255, 157, 0.42)',
      tint: 'rgba(103, 255, 157, 0.08)',
    },
    guardrails:
      'Never include real, actionable hacking instructions, working commands, tool names, payloads, exploit details or credentials. Dramatise the tension and the social cost of the act — never the method. No graphic violence.',
    systemPrompt:
      'You are the narrative engine for a cybercrime thriller interactive fiction demo. Write like a noir about labour and leverage: the crime is done in rooms with fluorescent light. IMPORTANT: never describe real, actionable techniques, commands, exploits, payloads or tools. Depict consequence, pressure and trust — never method.',
    nouns: {
      places: [
        'a co-working space that is quiet at 4 a.m. for a reason',
        'the basement of a payment processor nobody audits',
        'a logistics depot where the scanners blink twice',
        'the roof of a building your badge should not open',
        'the last internet café in a district that has fibre everywhere else',
        'a dead data centre kept alive by a single uninterruptible lie',
      ],
      figures: [
        'Mara the drop-runner',
        'Osei the compliance officer',
        'Brandt your old cellmate',
        'the client known only as “K”',
        'the night-shift supervisor',
        'a very patient journalist',
      ],
      objects: [
        'an account that has been dormant for exactly one year',
        'a printed ledger in a bag nobody wants to carry',
        'a burner with one contact and no history',
        'a set of credentials that were never revoked',
        'a courier package addressed to a company that does not exist',
        'a recording of a phone call that was never made',
      ],
      pressures: [
        'the audit starts in nine hours',
        'someone is cleaning the logs from the inside',
        'the client has started paying you not to ask questions',
        'a colleague has not shown up, and their badge still works',
        'the money has already moved, and it moved twice',
        'a journalist has two of the same documents you do',
      ],
      stakes: [
        'the one person who did not lie to you',
        'eleven people’s paycheques',
        'the only copy of the truth',
        'your sister’s job, which is the reason you did any of this',
        'the difference between a whistleblower and a suspect',
      ],
      hours: ['4 a.m., the hour of clean logs', 'ninety minutes before the audit', 'the quiet shift change', 'the last hour before the market opens'],
      sensations: [
        'The fluorescent light makes everyone look like a suspect, including you.',
        'Somewhere a printer runs for nobody, and your phone buzzes on the same rhythm.',
        'The fire door is propped open. It is always propped open.',
        'Every screen in the room is a half-second slow, and you notice it now.',
        'The lift dings on a floor it should not stop at.',
      ],
    },
    beats: [
      [
        'You take the meeting at {place}, because the alternative was worse. {sensation} {figure} is already there, sitting with their back to the door.',
        '{place} at {hour}. {figure} slides a bag across the table and does not say who it belongs to.',
        'The job is simple, which is how you know it is not. {figure} wants {place} unlocked by morning. {sensation}',
        'You are called to {place} at short notice. {figure} is waiting with the kind of patience that means the price has already been agreed.',
      ],
      [
        'Two things become clear quickly: {pressure}, and {figure} has been keeping that from you.',
        '{figure} finally says it plainly — {pressure}. The room does not react, which is worse than if it had.',
        'You check twice because you do not believe it: {pressure}. {figure} has been counting on your disbelief.',
        'Somebody made a decision without you. {pressure}. {figure} will not say who signed off.',
      ],
      [
        '{object} ends up in your possession, and you are not the only one who knows it.',
        'You find {object}. It is worth more than the fee, which means the fee was never the point.',
        '{object}, still sealed, still logged as delivered. {figure} flinches when you set it down.',
        'The thing everyone wants is {object}, and tonight it is exactly where you are standing.',
      ],
      [
        'There are nine hours until the audit and one decision left in the room. {figure} is waiting for it.',
        'You can hand it up the chain or out the side door. Either way {stake} is decided tonight, by you, in this room.',
        'The car is outside. The logs are clean. All that is left is which version of {stake} you can live with.',
        '{figure} asks the only question that matters now: who are you protecting — the client, or {stake}?',
      ],
    ],
    threads: [
      '{figure2} has been on the phone since you sat down, and not to you.',
      '{object} has moved since you last checked, which means someone watched you check.',
      'The badge log for {place2} shows a door opened at 4:11 and never closed.',
      'You catch yourself counting the exits, which is not a thing you used to do.',
      'The coffee is fresh, which is odd, because the machine has been broken for a month.',
    ],
    mood: [
      'Nothing here is illegal in a way that would surprise anyone at head office.',
      'Everyone in the room is one signature away from being a witness.',
      'You are being told the truth, which is the most dangerous thing that has happened all week.',
      'The paperwork is immaculate, which is how you know it is wrong.',
      'Somebody has already made the prudent choice. That is what worries you.',
    ],
    stakesLines: [
      'What is actually on the table is {stake}.',
      'The exposure is not the crime — it is {stake}.',
      'Whatever you do, {stake} is now in play.',
      'The audit will find the truth about {stake}, or a very convincing version of it.',
      'This is not about money. It is about {stake}.',
    ],
    twistLenses: [
      'You were never the contractor. You were the recorded evidence, and the job was the recording.',
      'The audit is not looking for a theft. It is looking for a person to blame — and they have your badge number.',
      'The client and the compliance officer are the same party, and this has been a hiring test.',
      'The money moved twice because the second transfer was made by someone who wants to be caught.',
    ],
    endingTitles: ['Clean Logs', 'The Quiet Version', 'Nine Hours', 'Uptime', 'Side Door', 'Witness, Not Suspect'],
  },
};

/** The structured-output contract every AI call must satisfy (see TRD). */
export const SCENE_SCHEMA = {
  sceneText: 'string',
  options: [
    {
      text: 'string',
      tags: {
        tensionDelta: '-1 | 0 | +1 | +2',
        clue: 'string | null',
        ally: 'string | null',
        profileAxis: {
          bold_cautious: '-1 to +1',
          lone_social: '-1 to +1',
          curious_decisive: '-1 to +1',
        },
      },
    },
  ],
};

export const ENDING_SCHEMA = {
  title: 'string',
  text: 'string',
  twist: 'string',
  epilogue: 'string',
};

export function getGenre(id) {
  return GENRES[id] || null;
}

export function genrePalette(id) {
  return (GENRES[id] || GENRES.scifi).palette;
}

/** Hard constraints re-sent with every generation so tone cannot drift. */
export function constraintBlock(genreId) {
  const genre = getGenre(genreId);
  return [...GLOBAL_CONSTRAINTS, genre ? genre.guardrails : ''].filter(Boolean).join('\n- ');
}
