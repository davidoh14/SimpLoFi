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
    'guitar-acoustic': [1,2,3],
    'cello': [2,3,4]
}

let current_inst = 'piano'
let high_oct = inst[current_inst].slice(-1)[0]

let keys = document.querySelectorAll('.key')
let instruments = document.querySelectorAll('.inst')
let octs = document.querySelectorAll('.oct') 

const setKeys = function() {keys.forEach(key => {
    let mid_oct = high_oct - 1
    let low_oct = high_oct - 2

    // if (low_oct < 0) {
    //     low_oct === null
    // }
    
    
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
        console.log(high_oct);
        console.log(octRange[2]);
        console.log(octRange.slice(-1)[0]);
        if (high_oct > octRange[2] && high_oct <= octRange.slice(-1)[0]) {
            if (e.target.innerText === 'Down') {
                high_oct -= 1;
                setKeys();
            } else {
                high_oct += 1;
                setKeys();
            }
        // } else {
        //     alert('Octaves out of range');
        }
    }
)})


instruments.forEach(inst => {
    inst.addEventListener('click', () => changeInst(inst))
})

function changeInst(inst) {
    const current_inst = inst.innerText.toLowerCase();
    high_oct = inst[current_inst].slice(-1)[0];
}

document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    if (keyIndex > -1) playNote(keys[keyIndex]);
});

document.addEventListener('keyup', e => {
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    const divKey = keys[keyIndex]
    const noteOctave = `${divKey.dataset.note}${divKey.dataset.octave}`

    if (keyIndex > -1) {
        keys[keyIndex].classList.remove('active');
        const playingNote = Object.keys(playing).filter(key => key === noteOctave);
        const noteAudio = playing[playingNote];
        stopNote(noteAudio);
        delete playing[noteOctave];
    };
});

const playing = {}; // playing[playingNote] = noteAudio

function playNote(key){
    console.log(key.dataset.octave)
    const noteOctave = `${key.dataset.note}${key.dataset.octave}`
    if (!key.dataset.note) return;
    if (Object.keys(playing).includes(noteOctave)) return;

    const noteURL = "samples/" + current_inst + "/" + key.dataset.note + key.dataset.octave + ".wav";
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

let playingChord = {}; // 'chord.dataset.file' : [chord, chordAudio]
let playingChordKVP = Object.entries(playingChord)[0]; // returns ['chord.dataset.file', [li.chord.active, audio]]
let playingChordAudio = playingChordKVP[1][1]; 

let isPlaying = false;

function playToggle(chord){
    
    const existingChord = Object.keys(playingChord) // returns chord.dataset.file as Mystery
    const newChord = chord.dataset.file // returns chord.dataset.file as Mystery
    
    
    // playChord(chord)
    console.log(existingChord, 'this is existingChord');
    if (existingChord[0] === newChord) {
        console.log(chord,'line 146')
        pauseChord(chord)
    } else if (existingChord.length && (existingChord[0] !== newChord)) {
        console.log('2')
        pauseChord(playingChordKVP);
        playChord(chord);
    } else {
        playChord(chord);
    }
}

function playChord(chord){
    
    // if (isPlaying === false)
    //     {
        const chordURL = "samples/LANDR/" + chord.dataset.file + ".wav"
        const chordAudio = new Audio(chordURL);
        recommended(chord);
        
        chordAudio.currentTime = 0;
        chordAudio.play();
        
        chordAudio.loop = true;
        chord.classList.add('active');
        playingChord[chord.dataset.file] = [chord, chordAudio];
        //     isPlaying = true;
        // } else if (isPlaying === true) {
            //     // console.log(chord, 'this is the chord');
            //     // console.log(chordAudio, 'this is the chordAudio');
            //     // // chordAudio.pause();
            //     let playingChordKVP = Object.entries(playingChord)[0]; // returns ['chord.dataset.file', [li.chord.active, audio]]
            //     let playingChordAudio = playingChordKVP[1][1]; 
            //     playingChordAudio.pause();
            //     playingChordAudio.currentTime = 0;
            
            //         // chordAudio.currentTime = 0;
    //         isPlaying = false;
    // }
}

function pauseChord(chord){
    let playingChordKVP = Object.entries(playingChord)[0]; // returns ['chord.dataset.file', [li.chord.active, audio]]
    let playingChordAudio = playingChordKVP[1][1];

    console.log(chord, 'this is pauseChord chord')
    playingChordAudio.pause();
    playingChordAudio.currentTime = 0;
    
    unrecommended();
    // chord.classList.remove('active');
    // delete playingChord[chord.dataset.file];
    playingChord = {};
}

function recommended(chord) {
    // console.log(chord, 'this is the chord from recommended');
    
    const mkey = chord.dataset.mkey;
    
    keys.forEach(key => {
        if (scales[mkey].includes(key.dataset.note)) {
            key.classList.add('recommended');
        };
    });
}

function unrecommended() {
    // console.log(chord, 'this is the chord from UNrecommended');
    // const mkey = playingChordKVP.dataset.mkey;
    
    keys.forEach(key => {
        key.classList.remove('recommended');
    })
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