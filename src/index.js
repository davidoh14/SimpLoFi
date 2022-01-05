window.addEventListener("DOMContentLoaded", () => {
    setKeys();
})

const keyboard = [
'1', '2', '3','4', '5', '6', '7', '8', '9', '0', '-', 
'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

const scales = {
    'Am11':['C','G', 'E', 'D', 'F', 'A', 'B', 'Fs'],
    'Cm11':['C', 'Ds', 'G', 'As', 'D', 'F', 'A'],
    'Fm11':['F', 'Gs', 'C', 'Ds', 'G', 'As', 'D'],
    'GM7':['G', 'B', 'Fs', 'D', 'B', 'A', 'C', 'Ds', 'E']
}

const inst = {
    'piano': [0,1,2,3,4,5,6],
}

let current_inst = 'piano'
let high_oct = inst[current_inst].slice(-1)[0]

let keys = document.querySelectorAll('.key')
let octs = document.querySelectorAll('.oct') 

const playing = {}; // playing[playingNote] = noteAudio

const setKeys = function() {keys.forEach(key => {
    let mid_oct = high_oct - 1
    let low_oct = high_oct - 2

    key.addEventListener('click', () => playNote(key))
    if (key.dataset.tier === "high") {
        key.setAttribute("data-octave", `${high_oct}`);
    } else if (key.dataset.tier === "mid") {
        key.setAttribute("data-octave", `${mid_oct}`);
    } else {
        key.setAttribute("data-octave", `${low_oct}`);
    }
})}

setKeys();

octs.forEach(oct => {
    oct.addEventListener('click', (e) => {
        const octRange = inst[current_inst]
        
        if (e.target.innerText === 'Down') {
            if (high_oct > octRange[2]) {            
                high_oct -= 1;
                setKeys();
            } else {
                alert('This is the lowest octave')
            }
        } else {
            if (high_oct <= octRange.slice(-1)[0]) {
                high_oct += 1;
                setKeys();
            } else {
                alert('This is the highest octave')
            }
        }
    }
)})


document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    playNote(keys[keyIndex]);
});

document.addEventListener('keyup', e => {
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    const divKey = keys[keyIndex]
    const noteOctave = `${divKey.dataset.note}${divKey.dataset.octave}`

    keys[keyIndex].classList.remove('active');
    delete playing[noteOctave];
});

function playNote(key){
    const noteOctave = `${key.dataset.note}${key.dataset.octave}`
    if (!key.dataset.note) return;
    if (Object.keys(playing).includes(noteOctave)) return;

    const noteURL = "samples/" + current_inst + "/" + key.dataset.note + key.dataset.octave + ".wav";
    const noteAudio = new Audio(noteURL)

    noteAudio.play()
    noteAudio.classList.add('playing')
    playing[`${key.dataset.note}${key.dataset.octave}`] = noteAudio

    key.classList.add('active')
    noteAudio.addEventListener('ended', () => key.classList.remove('active'))
}

function stopNote(noteAudio){
    noteAudio.pause();
}




let playingChordAudio;

const chords = document.querySelectorAll('.chord')

chords.forEach(chord => {
    chord.addEventListener('click', () => playToggle(chord));
})

function playToggle(chord){
    const newChord = chord.dataset.file // returns chord.dataset.file as 'Mystery'

    if (!playingChordAudio){
        playChord(chord);
        return;
    } else if (playingChordAudio.src.includes(newChord)) {
        pauseChord(chord)
    } else {
        pauseChord();
        playChord(chord);
    }
}

function playChord(chord){
    const chordURL = "samples/LANDR/" + chord.dataset.file + ".wav"
    const chordAudio = new Audio(chordURL);
    chordAudio.volume = 0.5;
    recommend(chord);

    chordAudio.currentTime = 0;
    chordAudio.play();

    chordAudio.loop = true;
    chord.classList.add('active');
    playingChordAudio = chordAudio;
}

function pauseChord(){
    playingChordAudio.pause();
    playingChordAudio.currentTime = 0;
    chords.forEach(chord => {
        chord.classList.remove('active');
    });
    
    unrecommend();
    playingChordAudio = null;
}



function recommend(chord) {
    const mkey = chord.dataset.mkey;
    
    keys.forEach(key => {
        if (scales[mkey].includes(key.dataset.note)) {
            key.classList.add('recommend');
        };
    });
}

function unrecommend() {
    keys.forEach(key => {
        key.classList.remove('recommend');
    })
}





