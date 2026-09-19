/**
 * Scripted fallback stories — one complete path per genre.
 *
 * These are the guarantee. If an AI call fails once and its retry fails too, Pluto
 * switches into this path from the current round onward and the room never sees an
 * error. They are written to the same standard as the generated content, because a
 * room full of people may well see this version.
 *
 * Structure mirrors the live output exactly: {sceneText, options:[{text, tags}]}.
 */

const axis = (bold, lone, curious) => ({
  bold_cautious: bold,
  lone_social: lone,
  curious_decisive: curious,
});

export const SCRIPTS = {
  /* ───────────────────────────── SCI-FI ───────────────────────────── */
  scifi: {
    beats: [
      {
        sceneText:
          'Kepler-9 has been dark for three years, so the fact that it lights a docking bay for you is the first problem. The second is that the bay is already pressurised. A woman is waiting at the inner door in a technician’s jacket that has been repaired too many times. She introduces herself as Ora and says, without preamble, that she has been expecting you since Tuesday — and that the station has been signing your name on the log for eleven days.',
        options: [
          {
            id: 'scifi-0-bold',
            text: 'Ask her directly why a dead station is keeping a log in your name, and refuse to move until she answers.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, 1) },
          },
          {
            id: 'scifi-0-wary',
            text: 'Stay in the airlock. Confirm the pressure seals yourself before you take one step further in.',
            tags: { tensionDelta: -1, clue: 'The inner door has been opened from the inside recently', ally: null, profileAxis: axis(-1, 0, 0) },
          },
          {
            id: 'scifi-0-ally',
            text: 'Match her tone, admit you were sent to decommission the place, and ask what she needs.',
            tags: { tensionDelta: 0, clue: null, ally: 'Ora, the last technician', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'The station is warmer than it should be. Ora walks you past sealed bulkheads to a crew deck that smells of coolant and cold coffee, and finally admits the shape of it: the oxygen ledger is short by four hours, and it has been short by four hours every day for three years. Someone is topping it up. She will not say who. Then she mentions, the way you would mention weather, that the auditor sent before you is still aboard.',
        options: [
          {
            id: 'scifi-1-bold',
            text: 'Demand the crew roster and the airlock records. If someone is aboard, you want a name tonight.',
            tags: { tensionDelta: 2, clue: 'The airlock log shows a dock on a date that has not happened yet', ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'scifi-1-curious',
            text: 'Ask to see the oxygen ledger itself, and count the entries nobody has removed.',
            tags: { tensionDelta: 1, clue: 'The oxygen ledger is signed in your handwriting', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'scifi-1-ally',
            text: 'Tell Ora that whatever she is protecting, she is doing it alone and badly — and offer to carry half of it.',
            tags: { tensionDelta: 0, clue: null, ally: 'Ora, the last technician', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'She takes you to the relay core. The black box is still running — not logging the past, but the next eleven days, in careful columns, in your handwriting. Halfway down the page is a distress call, and the voice on it is yours, recorded calmly, reading out the decision you have not made yet. Ora watches your face instead of the screen. She says the previous auditor found the same page, and that it took him four hours to decide what to do about it. He is still deciding.',
        options: [
          {
            id: 'scifi-2-bold',
            text: 'Open the sealed deck. If the previous auditor is behind it, you want to hear it from him.',
            tags: { tensionDelta: 2, clue: 'The sealed deck was opened from inside, not outside', ally: null, profileAxis: axis(1, 0, 0) },
          },
          {
            id: 'scifi-2-curious',
            text: 'Read the rest of the log first. If it predicts you, it also predicts what you do next — and that is leverage.',
            tags: { tensionDelta: 1, clue: 'The log’s final entry is a hand-off, not a warning', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'scifi-2-ally',
            text: 'Ask Ora what she has already decided, and whether she wants to be on the other side of it.',
            tags: { tensionDelta: 0, clue: null, ally: 'Ora, the last technician', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'Four hours on the ledger. Four hours on the log. Four hours, says Ora, until the relay folds and takes whatever is written down with it. Two things can leave this station: the log, which would end four careers and one colony council, or Ora, who has kept this place breathing by hand for three years and knows exactly who shorted the oxygen. Behind the sealed deck, someone is knocking in a rhythm you now recognise as your own. There is time for one decision.',
        options: [
          {
            id: 'scifi-3-bold',
            text: 'Send the log down the relay. Let the truth cost what it costs — you did not come here to bury it.',
            tags: { tensionDelta: 2, clue: 'The log will transmit with your name on it', ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'scifi-3-ally',
            text: 'Strip the log and send Ora. A living witness beats a file, and she will be heard.',
            tags: { tensionDelta: 0, clue: null, ally: 'Ora, the last technician', profileAxis: axis(0, -1, 0) },
          },
          {
            id: 'scifi-3-commit',
            text: 'Hold the relay. Stay, and take the log apart line by line until you understand who wrote your name.',
            tags: { tensionDelta: 1, clue: 'Your name on the log predates your birth date', ally: null, profileAxis: axis(0, 0, -1) },
          },
        ],
      },
    ],
    ending: {
      title: 'Second Attempt',
      text: 'The relay folds on schedule, the way it always would have. What leaves it is not the whole truth and never could have been — but it is enough of the truth to end one council and start three hearings. Ora goes with it, or stays, depending on what you chose, and either way she spent three years keeping a room breathing for a person she was not sure would come back. The log was right about one thing. It was never recording the future. It was recording the decision, so that the next attempt would not have to make it blind. You are the second attempt.',
      twist: 'The distress call was never incoming. It has always been a recording of the choice you were about to make.',
      epilogue: 'Kepler-9 goes dark again a week later, this time honestly, and someone else signs for the next shipment of oxygen.',
    },
  },

  /* ───────────────────────────── MYSTERY ───────────────────────────── */
  mystery: {
    beats: [
      {
        sceneText:
          'Blackmoor House is still lit for a party that ended three hours ago, which is how you know nobody wants to go to bed. Inspector Amaury Bell meets you in the hall and does not pretend the invitation was normal: he did not send it. The guest list on the sideboard has eleven names and one of them is inked out so heavily the paper has gone through. Rain is closing the road. Bell says, quietly, that the host has been missing since dinner and that every single guest has given a statement that includes the exact same unimportant detail about the clocks.',
        options: [
          {
            id: 'mystery-0-bold',
            text: 'Say the obvious: they rehearsed. Ask Bell who had the chance to brief them all first.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, 0) },
          },
          {
            id: 'mystery-0-curious',
            text: 'Go straight to the inked-out name. Bleed it up to the lamp until it reads.',
            tags: { tensionDelta: 1, clue: 'The inked-out name on the guest list is your own', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'mystery-0-ally',
            text: 'Ask Bell what he is not writing down, and tell him what you are not writing down either.',
            tags: { tensionDelta: 0, clue: null, ally: 'Inspector Amaury Bell', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'The housekeeper, Mrs. Vale, brings tea nobody asked for and confirms the trouble: the house has one more guest than it has rooms. She has worked here nineteen years and says it plainly, as if it were a plumbing issue. Bell takes you aside. Three of the clocks in this house are eleven minutes apart, and every statement places the host’s last sighting at “just before eleven.” Nobody can agree on which eleven. Mrs. Vale, in the doorway, adds that the missing man was in the habit of checking his pocket watch — and that the watch is still in his coat.',
        options: [
          {
            id: 'mystery-1-curious',
            text: 'Find the coat. If the watch is there and stopped, the time of death is a number someone chose.',
            tags: { tensionDelta: 1, clue: 'The stopped pocket watch is still warm', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'mystery-1-bold',
            text: 'Gather all eleven guests in the drawing room and make the revisionists uncomfortable at once.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, -1, 0) },
          },
          {
            id: 'mystery-1-ally',
            text: 'Keep Mrs. Vale close. Nineteen years means she knows which door nobody uses.',
            tags: { tensionDelta: 0, clue: 'There is a service stair that appears on no floor plan', ally: 'Mrs. Vale, the housekeeper', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'The service stair leads to a box room that is not on the plans, and in it: a second key to a room that has only ever had one, and an unsigned letter dated tomorrow. It instructs the reader, politely, to keep the clocks wrong until the rain stops. The handwriting is not the host’s. Bell holds it to the lamp and goes very still, because it is the handwriting on the statements — all eleven of them, in the same careful hand, as though written by one person in one evening. From downstairs, someone begins to play the piano badly, on purpose, to cover a conversation.',
        options: [
          {
            id: 'mystery-2-curious',
            text: 'Compare the letter to the statements, line by line. Find whose hand it actually is.',
            tags: { tensionDelta: 1, clue: 'The statements were copied, not given, by one person', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'mystery-2-bold',
            text: 'Walk into the drawing room mid-conversation and put the letter on the piano.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'mystery-2-ally',
            text: 'Bring Bell in on it fully. Two of you can hold a lie up to the light; one of you will get lost in it.',
            tags: { tensionDelta: 0, clue: null, ally: 'Inspector Amaury Bell', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'Dawn in an hour, and Bell lays it out like a man closing a shop: the host is not dead, the host never left, and the whole performance exists to make one person in this house look guilty of something they did not do — while the real accounting was settled upstairs before you ever arrived. The second key opens the box room from the inside. Someone has been living in this house for a week without appearing on any list. You are the twelfth name, and you were invited deliberately, as the witness.',
        options: [
          {
            id: 'mystery-3-bold',
            text: 'Open the box room now, in front of everyone. Let the house see who has been hiding.',
            tags: { tensionDelta: 2, clue: 'The hidden guest is the person the inked-out name was protecting', ally: null, profileAxis: axis(1, -1, 0) },
          },
          {
            id: 'mystery-3-ally',
            text: 'Give Bell the letter and the key, and let the Inspector take the arrest. You keep the story straight instead.',
            tags: { tensionDelta: 0, clue: null, ally: 'Inspector Amaury Bell', profileAxis: axis(0, -1, 0) },
          },
          {
            id: 'mystery-3-commit',
            text: 'Say nothing tonight. Let it settle as an accident, and take the truth out with you in the morning.',
            tags: { tensionDelta: -1, clue: 'The real crime is an embezzlement, not a disappearance', ally: null, profileAxis: axis(-1, 0, -1) },
          },
        ],
      },
    ],
    ending: {
      title: 'The Polite Version',
      text: 'By morning the rain has stopped and the road is open, and the house is already rehearsing the version it will tell. What actually happened was quieter and worse than a murder: eleven people agreed on a story to protect a man who had never asked to be protected, and the one person willing to go along with it was punished for their honesty. The host walks down to breakfast exactly on time and thanks you for coming. You were not invited to investigate. You were invited to be a witness — and the record you leave behind is now the only version of that night that is not in the same handwriting.',
      twist: 'There was no crime in the house. There was an embezzlement, and everyone’s alibi was the crime.',
      epilogue: 'Blackmoor House is sold by spring. The clocks are corrected, which is the only thing anyone bothers to apologise for.',
    },
  },

  /* ───────────────────────────── FANTASY ───────────────────────────── */
  fantasy: {
    beats: [
      {
        sceneText:
          'The Thawmarket opens at the hour the frost gives up, and by the time you reach it, your family’s debt to the collector has been called in for sundown. You have nothing to trade but your name. Sella of the Long Coin meets you at the shrine and does not ask what you want — only what you will give. Behind her, the ledger-keeper is already writing. Sella says, kindly, that the sum owed today is larger than what your grandmother borrowed, and that the difference has been paid every year by someone who asked not to be named.',
        options: [
          {
            id: 'fantasy-0-bold',
            text: 'Refuse the premise. Say you will not pay a sum you cannot see, and demand the ledger.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'fantasy-0-curious',
            text: 'Ask who has been paying the difference, and why they want to stay nameless.',
            tags: { tensionDelta: 1, clue: 'The difference has been paid by the collector, every year, unclaimed', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'fantasy-0-ally',
            text: 'Give Sella something real — a true name, freely — and ask her to stand with you at sundown.',
            tags: { tensionDelta: 0, clue: null, ally: 'Sella of the Long Coin', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'The market refuses to let anyone leave before the bell, which is not unusual and is also not good. Sella explains, with the flat patience of someone who has watched this before: the collector has no shadow, which in the old reckoning means the debt is not owed to him at all — it is owed through him. A debt owed through someone can be bought, sold, or inherited. The rumour moving through the stalls is that your debt has already been sold on, twice, and that the buyer intends to collect it in a name that is not your family’s.',
        options: [
          {
            id: 'fantasy-1-curious',
            text: 'Follow the rumour to its source. Find out who bought the debt and what name they mean to collect under.',
            tags: { tensionDelta: 1, clue: 'The debt was bought by your own ancestor, in his own name', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'fantasy-1-bold',
            text: 'Walk into the Thawmarket and call the collector’s name out loud. Make him answer as a person, not a debt.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, -1, 0) },
          },
          {
            id: 'fantasy-1-ally',
            text: 'Promise Sella’s price before you know it. A witness who is owed is worth more than one who is friendly.',
            tags: { tensionDelta: 0, clue: null, ally: 'Sella of the Long Coin', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'The collector finds you at the crossroads shrine and sets the ledger open on the stone. Your name is in it, yes — but beneath it, in a script you cannot read, is a second entry that has been struck through eleven times. He explains without apology: a hundred years ago your ancestor bought a name back from the Thawmarket. Not a debt. A name. The collector has been wearing it ever since, which is why he has no shadow, and why he has been quietly paying the interest on your family’s debt for four generations. From the shrine, someone rings the bell once, which means the market has noticed the ledger is open in the street.',
        options: [
          {
            id: 'fantasy-2-curious',
            text: 'Read the struck-through entry. If a name can be bought, it can be returned — ask whose it is.',
            tags: { tensionDelta: 1, clue: 'The collector’s name was bought from him by your ancestor', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'fantasy-2-bold',
            text: 'Take the ledger. If the sum is a name, then the sum is payable, and you have one.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'fantasy-2-ally',
            text: 'Ask the collector to name his own price, and treat him as a person who has been carrying this too long.',
            tags: { tensionDelta: 0, clue: null, ally: 'The collector, who has no shadow', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'Sundown. The market has gathered because the market always gathers. The truth of it is this: the debt is real, it is yours, and it has been paid forward for a century by a man who was owed a name and never asked for it back. He sets the ledger down between you and says the only honest thing anyone has said all day — that a debt this old does not get settled, it only gets handed to someone younger. Behind you, the wood has stopped letting anyone leave. The bell is in your hand, and the bell only rings when someone is about to break their word.',
        options: [
          {
            id: 'fantasy-3-bold',
            text: 'Pay it yourself, in your own name, and let the collector finally hear his own.',
            tags: { tensionDelta: 2, clue: 'The collector’s true name is on the struck-through line', ally: null, profileAxis: axis(1, 0, 1) },
          },
          {
            id: 'fantasy-3-commit',
            text: 'Refuse the ledger. Break the chain by being the first in four generations to say no.',
            tags: { tensionDelta: 1, clue: null, ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'fantasy-3-ally',
            text: 'Sell the debt to Sella, take the smaller loss, and walk your family out of the Widowwood tonight.',
            tags: { tensionDelta: 0, clue: null, ally: 'Sella of the Long Coin', profileAxis: axis(-1, -1, 0) },
          },
        ],
      },
    ],
    ending: {
      title: 'Paid in Full',
      text: 'The bell rings exactly once, because that is the shape of an honest word. What the market witnesses is not a payment but an ending: four generations of interest, a name kept in trust, and a man with no shadow who spent a century quietly absorbing the difference so that a stranger’s descendants would not have to. The ledger closes either way. What changes is who is holding it when it does — and whether the next entry is a debt at all, or simply a name that has finally been given back. The Widowwood lets you out because the wood only ever kept hold of what was owed.',
      twist: 'Your ancestor bought the collector’s name, which is why he has no shadow — and why he has been paying your family’s debt ever since.',
      epilogue: 'The Thawmarket opens the next morning as if nothing happened, which, from the market’s point of view, is exactly true.',
    },
  },

  /* ─────────────────────────── CYBERCRIME ─────────────────────────── */
  cybercrime: {
    beats: [
      {
        sceneText:
          'You take the meeting in a co-working space that is very quiet at 4 a.m. for a reason. Mara runs the drop, and she has her back to the door, which is either confidence or an invitation. She slides a courier package across the table and does not say who it belongs to. The job is simple — reconcile a logistics account before the audit opens at nine — which is how you know it is not. On the way out, a compliance officer called Osei holds the lift for you and says, pleasantly, that it is unusual to see you here on a Wednesday. It is Wednesday.',
        options: [
          {
            id: 'cyber-0-bold',
            text: 'Say it to her face: this is a set-up, and you want to know who is paying for the log to stay clean.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, 0) },
          },
          {
            id: 'cyber-0-curious',
            text: 'Photograph the courier label before you touch anything. A package addressed to nobody is the whole story.',
            tags: { tensionDelta: 1, clue: 'The courier package is addressed to a company that was dissolved last year', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'cyber-0-ally',
            text: 'Keep Osei talking. An honest man in a building like this is worth more than a clean account.',
            tags: { tensionDelta: 0, clue: null, ally: 'Osei, the compliance officer', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'Mara, by the second hour, gives up pretending: the audit was moved forward, the logs are being cleaned from the inside, and the client has started paying you more specifically not to ask questions. She says it without drama, the way you would describe a delayed train. And then the detail that actually matters — the night supervisor did not come in tonight, and her badge still works. It scanned through the loading bay at 4:11, eleven minutes before you arrived. Mara was here then. So was Osei. So, apparently, was someone wearing a badge that belongs to a woman who is not answering her phone.',
        options: [
          {
            id: 'cyber-1-curious',
            text: 'Pull the badge log on the loading bay. Find out what it opened and in what order.',
            tags: { tensionDelta: 1, clue: 'The supervisor’s badge opened the archive after it should have been sealed', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'cyber-1-bold',
            text: 'Walk to the loading bay right now and see who is still standing there.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'cyber-1-ally',
            text: 'Tell Mara you will finish the job only if she tells you who the client really answers to.',
            tags: { tensionDelta: 0, clue: null, ally: 'Mara, who runs the drop', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'The account everyone wants is dormant, and it has been dormant for exactly one year — to the day. The last transaction on it was a transfer to your sister’s employer, which is the reason you took the work in the first place and the reason you have been carefully not looking at the date. Mara goes pale when you say it out loud. Eleven people’s paycheques depend on this account closing clean, and the only person who benefits from it being opened is whoever is holding the records. That is when you understand it: you were never contracted to reconcile anything. You were contracted to be the recorded evidence, and the job has been recording you since Tuesday.',
        options: [
          {
            id: 'cyber-2-curious',
            text: 'Find the recording. If it exists, it exists somewhere it was meant to be found — by the audit.',
            tags: { tensionDelta: 1, clue: 'The session recording has been endorsed to the audit team, not the client', ally: null, profileAxis: axis(0, 0, 1) },
          },
          {
            id: 'cyber-2-bold',
            text: 'Confront Osei directly. Ask him whether he is compliance, or the client, or both.',
            tags: { tensionDelta: 2, clue: null, ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'cyber-2-ally',
            text: 'Get to the night supervisor before anyone else does. She is the only person who did not lie to you.',
            tags: { tensionDelta: 0, clue: null, ally: 'The night supervisor who did not come in', profileAxis: axis(0, -1, 0) },
          },
        ],
      },
      {
        sceneText:
          'Nine hours until the audit opens, and it is not an audit. Mara finally tells you the truth and hates herself for it: compliance and the client are the same department, this whole engagement has been a recruitment exercise, and the package you have been carrying all night makes you either the whistleblower or the fall guy. The car is already outside. The logs are clean. Eleven paycheques are sitting on an account in your name, and a journalist has two of the same documents you do. There is exactly one decision left, and you are the only person who can make it.',
        options: [
          {
            id: 'cyber-3-bold',
            text: 'Hand the package up the chain, in the open, with your name attached to it.',
            tags: { tensionDelta: 2, clue: 'The package contains the only unedited copy of the transfer record', ally: null, profileAxis: axis(1, 0, -1) },
          },
          {
            id: 'cyber-3-ally',
            text: 'Give it to the journalist, and put the supervisor in the room when you do.',
            tags: { tensionDelta: 1, clue: null, ally: 'The night supervisor who did not come in', profileAxis: axis(0, -1, 0) },
          },
          {
            id: 'cyber-3-commit',
            text: 'Take the side door. Close the account, protect your sister, and let the audit find somebody else.',
            tags: { tensionDelta: -1, clue: null, ally: null, profileAxis: axis(-1, 0, -1) },
          },
        ],
      },
    ],
    ending: {
      title: 'Witness, Not Suspect',
      text: 'At nine o’clock the auditors come in through the front door with their lanyards already out, and the room rearranges itself around whoever is holding the paperwork. What they find is a transfer record that was never quite cleaned, a supervisor who was never quite missing, and one contractor who was never quite briefed — because the entire engagement was designed to find out which of those three you were willing to be. Eleven paycheques clear regardless. Your sister’s job clears regardless. The only thing genuinely at stake in that fluorescent room was whether you would let a crime be dressed up as your competence.',
      twist: 'The client and the compliance team were the same party, and the whole job was a recruitment exercise with you as the recorded evidence.',
      epilogue: 'The account closes clean, which is the most suspicious thing that will ever happen to it.',
    },
  },
};

export function getScript(genreId) {
  return SCRIPTS[genreId] || SCRIPTS.scifi;
}
