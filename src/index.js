const keyboard = [
'1', '2', '3','4', '5', '6', '7', '8', '9', '0', '-', 
'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

const scales = {
    'Gm9':['C', 'G', 'As', 'D', 'F', 'A', 'Ds'],
    'Cm11':['C', 'Ds', 'G', 'As', 'D', 'F', 'A']
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
    // noteAudio.volume = 1
    // const fadePoint = noteAudio.currentTime;

    noteAudio.pause();
}

const chords = document.querySelectorAll('.chord')
chords.forEach(chord => {
    chord.addEventListener('click', () => playToggle(chord));
})

const playingChord = {}; // 'chord.dataset.file' : [chord, chordAudio]
// let playingChordKVP = Object.entries(playingChord)[0]; // returns ['chord.dataset.file', [li.chord.active, audio]]
// let playingChordAudio = playingChordKVP[1][1]; 

function playToggle(chord){
    const existingChord = Object.keys(playingChord) // returns chord.dataset.file as Mystery
    const newChord = chord.dataset.file // returns chord.dataset.file as Mystery
    
    if (existingChord[0] === newChord) {
        pauseChord(chord)
    // } else if (existingChord.length && (existingChord[0] !== newChord)) {
    //     console.log('2')
    //     pauseChord(chord);
    //     playChord(chord);
    } else {
        playChord(chord);
    }
}

function playChord(chord){
    const chordURL = "samples/LANDR/" + chord.dataset.file + ".wav"
    const chordAudio = new Audio(chordURL);
    recommended(chord);
    
    chordAudio.play();
    chordAudio.loop = true;
    chord.classList.add('active');
    playingChord[chord.dataset.file] = [chord, chordAudio];
    console.log(playingChord)
}

function recommended(chord) {
    const mkey = chord.dataset.mkey;
    
    keys.forEach(key => {
        if (scales[mkey].includes(key.dataset.note)) {
            key.classList.add('recommended');
        };
    });
}

function unrecommended(chord) {
    const mkey = chord.dataset.mkey;
    
    keys.forEach(key => {
        if (scales[mkey].includes(key.dataset.note)) {
            key.classList.remove('recommended');
        };
    });
}

function pauseChord(chord){
    let playingChordKVP = Object.entries(playingChord)[0]; // returns ['chord.dataset.file', [li.chord.active, audio]]
    let playingChordAudio = playingChordKVP[1][1]; 
    
    playingChordAudio.pause();
    chord.classList.remove('active');
    unrecommended(chord);
    delete playingChord[chord.dataset.file];
}


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