const keyboard = [
'1', '2', '3','4', '5', '6', '7', '8', '9', '0', '-', 
'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

// const Cmin11 = ['C']


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
    console.log(noteOctave);
    if (!key.dataset.note) return;
    // console.log(key)
    // console.log(Object.keys(playing))
    if (Object.keys(playing).includes(noteOctave)) return;
    console.log(Object.keys(playing).includes(key));
    const noteURL = "samples/piano/" + key.dataset.note + key.dataset.octave + ".wav";
    const noteAudio = new Audio(noteURL)
    noteAudio.currentTime = 0

    noteAudio.play()
    noteAudio.classList.add('playing')
    playing[`${key.dataset.note}${key.dataset.octave}`] = noteAudio
    // console.log(playing)

    key.classList.add('active')
    noteAudio.addEventListener('ended', () => key.classList.remove('active'))
    key.addEventListener('keyup', () => console.log('blah'))
}

function stopNote(noteAudio){
    console.log(noteAudio)
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
        pauseChord(chordAudio);
        delete playingChords[chord.dataset.chord];
    } else {
        playChord(chord);
    }
}

function playChord(chord){
    const chordURL = "samples/LANDR/" + chord.dataset.chord + ".wav"
    console.log(chordURL)
    const chordAudio = new Audio(chordURL);
    console.log(chordAudio)

    chordAudio.play();
    chordAudio.loop = true;
    chord.classList.add('active');
    playingChords[chord.dataset.chord] = chordAudio;
}

function pauseChord(chordAudio){
    chordAudio.pause();
}

