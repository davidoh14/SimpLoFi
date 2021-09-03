BACKGROUND:

Welcome to SimpLoFi, where anybody can create a mini lo-fi song. Select the key you want your song to be in, a drum track, and harmonic chord progression (think of the left hand on a piano that sets you up for the melody). Now all that is left is to create a melody, with a concise range of recommended notes provided based on the key and chord progression!


FUNCTIONALITY:
    
In SimpLoFi, users will be able to:
- Select a key to determine the general direction of the song
- Select one of the provided chord progressions to create the basis for the melody 
- Select one of the provided drum beats
- Create a melody by selecting notes within the recommended notes, which are based on selected key and chord progression.
- Control volumes for drums, chord progression, and melody independently
- Select ambient noises
- Select different instruments
- Change tempo
- Record and playback 


MVPS:

- Key selector
- Chord progression selector
- Drum beat selector
- Melody maker and recommended notes
- Connection of keyboard button presses to event listeners



WIREFRAMES:

<img src="dist/assets/wireframe-simplofi.pdf">


TECHNOLOGIES, LIBRARIES, APIs:

- HTML
- CSS
- Javascript, DOM
- Tone.js
- Import instruments from Logic



IMPLEMENTATION TIMELINE:

- Friday Afternoon: 
    Setup project and webpack. 
    Finalize which technologies to use. 
    Understand Tone.js and how to utilize midi files in the program. 
    Research music theory to find recommended melody notes dependent on chord progression.
    
- Saturday: 
    Continue research on music theory to find recommended melody notes dependent on chord progression.
    Create all buttons to show and light up when clicked, and stay lit if toggled.
    Set up event listeners for each button to play a given sound. 

- Sunday: 
    Set up tempo of harmonic chord progression dependency on drum pattern tempo. 
    Set up the dependency of chord progression on key selector. (If this takes too long, do not set up a key selector.)
- Monday: 
    Create melody key logic to change dependent on harmonic chord progression.
    Make sure that re-rendering of recommended keys works if user changes chord progression
- Tuesday: 
    Find 8-bit pixel art to improve UI
    Use a piano visualizer
- Wednesday: 
    Continue to improve UI
