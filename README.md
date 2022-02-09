# SimpLoFi
https://user-images.githubusercontent.com/86807281/148483698-f3f8a384-3958-42a8-acfd-c3a3e364ba84.mp4

[Live](https://davidoh14.github.io/SimpLoFi/)

## OVERVIEW:

SimpLoFi allows you to make a mini lo-fi song, without learning music theory. Select a background track, and the keyboard keys representing piano notes that match the musical key of the background track will illuminate. Just play any of these recommended notes to make your own melody.


### WIREFRAME

![Homepage](https://user-images.githubusercontent.com/86807281/131962154-f521d09e-e265-4bf7-bfc7-752982975270.png)

### TECHNOLOGIES, LIBRARIES, APIs:

- Javascript, DOM
- HTML
- CSS


## IMPLEMENTATION

The main challenge of the project was designing the logic of key presses corresponding to piano notes. Finding a sample set for the piano keys with each .wav file labeled by note and octave ('A6') gave me the idea of setting each keyboard key as an HTML element with separate attributes for a musical note and octave. 

HTML

```html
<div data-note="Fs" data-octave="" data-tier="mid" class="key"><div class="inner-key">1</div></div>
```

I considered using a for loop to match the key attribute of a keypress event to the innerHTML value of the respective HTML element, but I wanted to make this part of the app as responsive as possible with a look up time of O(1). So I created a matching array of each key value, and indexed into that array to create a new audio object for each keypress.

```js
document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    playNote(keys[keyIndex]);
});

document.addEventListener('keyup', e => {
    const key = e.key;
    const keyIndex = keyboard.indexOf(key);

    keys[keyIndex].classList.remove('active');
});

function playNote(key){
    if (!key.dataset.note) return;

    const noteURL = "samples/" + current_inst + "/" + key.dataset.note + key.dataset.octave + ".wav";
    const noteAudio = new Audio(noteURL)

    noteAudio.play()
    noteAudio.classList.add('playing')

    key.classList.add('active')
    noteAudio.addEventListener('ended', () => key.classList.remove('active'))
}
```


Each keyboard key consistently represents the same musical note, but the octave attribute is one of three variables so that the octave setting function can modulate their values between octaves 0 through 6.

```js
const inst = {
    'piano': [0,1,2,3,4,5,6],
}

let current_inst = 'piano'
let high_oct = inst[current_inst].slice(-1)[0]

let keys = document.querySelectorAll('.key')
let octs = document.querySelectorAll('.oct') 

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
```



Because I needed the ability to play/pause the same background track, while enabling the ability to play another track and simultaneously pause the current track, I used a toggle function. I created a global variable for the toggle function to reference in order to check if a track already exists. Now this function can easily allocate pause and play functions to the track that is already playing, and the new track to be played.


```js
let playingChordAudio;

function playToggle(chord){
    const newChord = chord.dataset.file // returns chord.dataset.file as 'Pond...'

    if (!playingChordAudio){
        playChord(chord);
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
```


## UPCOMING FUNCTIONALITY
1. Additional instruments
2. Record
3. Separate drum tracks from background tracks
