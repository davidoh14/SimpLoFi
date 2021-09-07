const keyboard = ['1', '2', '3','4', '5', '6', '7', '8', '9', '0', '-', 
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

    if (keyIndex > -1) stopNote(keys[keyIndex])
})

function playNote(key){
    if (!key.dataset.note) return;
    const noteURL = "samples/piano/" + key.dataset.note + key.dataset.octave + ".mp3";
    const noteAudio = new Audio(noteURL)
    
    console.log("samples/piano/" + key.dataset.note + key.dataset.octave + ".mp3")

    noteAudio.play()
    key.classList.add('active')
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}

function stopNote(key){
    const noteAudio = document.getElementById(key.dataset.note)
    key.classList.remove('active')

    noteAudio.volume = Math.min(1, noteAudio.volume)
    const fadePoint = noteAudio.currentTime;

    noteAudio.pause();

    // const fadeAudio = setInterval(function () {
    //     if ((noteAudio.currentTime >= fadePoint) && (noteAudio.volume != 0.00)) {
    //         noteAudio.volume -= 0.10;
    //     } else if (noteAudio.volume === 0.00) {
    //         clearInterval(fadeAudio);
    //     }
    // }, 200);

}

const chords = document.querySelectorAll('.chord')
console.log(chords)
chords.forEach(chord => {
    chord.addEventListener('click', () => playToggle(chord));
})

function playToggle(chord){
    if (chord.classList.contains('active')) {
        pauseChord(chord);
    } else {
        playChord(chord);
    }
}

function playChord(chord){
    const chordAudio = document.getElementById(chord.dataset.chord)
    chordAudio.play()
    chordAudio.loop = true;
    chordAudio.currentTime = 0
    chord.classList.add('active')
}

function pauseChord(chord){
    const chordAudio = document.getElementById(chord.dataset.chord)
    chordAudio.pause();
    chord.classList.remove('active')
}

// loop pause, change to buttons
// separate notes from octaves
// loop through each key and set a src file that takes in the respective note and octave
// be able to decrement octave 
// instrument variable 
// create array for each key, and logic to only permit notes in that key
// toggle for staccato vs legato
// relook into setInterval

