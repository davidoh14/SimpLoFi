const keyboard = [
'1', '2', '3','4', '5', '6', '7', '8', '9', '0', '-', 
'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

const scales = {
    'Gm9':['G', 'Bb', 'D', 'F', 'A'],
    'Cm11':['C', 'Eb', 'G', 'Bb', 'D', 'Gb']
}

const keys = document.querySelectorAll('.key')

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    if (keyIndex > -1) playNote(keys[keyIndex])
})

document.addEventListener('keyup', e => {
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    const divKey = keys[keyIndex]
    const noteOctave = `${divKey.dataset.note}${divKey.dataset.octave}`
    

    if (keyIndex > -1) {
        keys[keyIndex].classList.remove('active');
        const playingNote = Object.keys(playing).filter(key => key === noteOctave)
        const noteAudio = playing[playingNote]
        stopNote(noteAudio);
        delete playing[noteOctave]
    }
})

const playing = {}; // playing[playingNote] = noteAudio

function playNote(key){
    const noteOctave = `${key.dataset.note}${key.dataset.octave}`
    if (!key.dataset.note) return;
    if (Object.keys(playing).includes(noteOctave)) return;

    const noteURL = "samples/piano/" + key.dataset.note + key.dataset.octave + ".wav";
    const noteAudio = new Audio(noteURL)
    noteAudio.currentTime = 0

    noteAudio.play()
    noteAudio.classList.add('playing')
    playing[`${key.dataset.note}${key.dataset.octave}`] = noteAudio

    key.classList.add('active')
    noteAudio.addEventListener('ended', () => key.classList.remove('active')) // for legato mode
}

function stopNote(noteAudio){
    noteAudio.volume = 1
    const fadePoint = noteAudio.currentTime;

    noteAudio.pause();

    // const temp = Object.values(playing).filter(val => val === noteAudio)
    // console.log(temp)

    // const fadeAudio = setInterval(function () {
    //     if ((noteAudio.currentTime >= fadePoint) && (noteAudio.volume > 0.00)) {
    //         console.log('2')
    //         noteAudio.volume -= 0.05;
    //     } else if (noteAudio.volume <= 0.00) {
    //         console.log('3')
    //         clearInterval(fadeAudio);
    //     }
    // }, 50);
}

const chords = document.querySelectorAll('.chord')
chords.forEach(chord => {
    chord.addEventListener('click', () => playToggle(chord));
})

const playingChords = {};

function playToggle(chord){
    if (playingChords.hasOwnProperty(chord.dataset.chord)) {
        const chordAudio = playingChords[chord.dataset.chord];
        chord.classList.remove('active');
        chordAudio.pause();
        delete playingChords[chord.dataset.chord];
    } else {
        playChord(chord);
    }
}

function playChord(chord){
    const chordURL = "samples/LANDR/" + chord.dataset.chord + ".wav"
    const chordAudio = new Audio(chordURL);
    recommended(chord);
    
    chordAudio.play();
    chordAudio.loop = true;
    chord.classList.add('active');
    playingChords[chord.dataset.chord] = chordAudio;
}

function recommended(chord) {
    const mkey = chord.dataset.mkey;

    keys.forEach(key => {
        // console.log(scales[mkey])
        console.log(key)
        if (scales[mkey].includes(key.dataset.note)) {
            key.classList.add('recommended');
        };
    });
}

// function pauseChord(chordAudio){
    
// }

