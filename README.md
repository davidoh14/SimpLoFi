![screenshot](/assets/SimpLoFi-Feature.png)

# [Live](https://davidoh14.github.io/)

# BACKGROUND:

Welcome to SimpLoFi, where anybody can create a mini lo-fi song. Select a chord progression (think of the left hand on a piano that sets you up for the melody). Now all that is left is to simply create a melody, with recommended notes based on the selected chord progression.


### FUNCTIONALITY
    
In SimpLoFi, users will be able to:
- Select one of the provided chord progressions to create the basis for the melody 
- Select one of the provided drum beats
- Create a melody by selecting notes within the recommended notes, which are based on selected chord progression.
- Control volumes for drums, chord progression, and melody independently
- Select ambient noises
- Select different instruments
- Change tempo
- Record and playback 


### MVPS

- One chord progression
- One drum track
- Keyboard visualization: Each key on the keyboard will represent a note, and each note that falls within the chord progressions will illuminate as recommendations


### WIREFRAME

![Homepage](https://user-images.githubusercontent.com/86807281/131962154-f521d09e-e265-4bf7-bfc7-752982975270.png)

TECHNOLOGIES, LIBRARIES, APIs:

- HTML
- CSS
- Javascript, DOM
- Tone.js
- Import instruments from Logic



### IMPLEMENTATION TIMELINE

- Friday Afternoon: 
    - Setup project and webpack. 
    - Finalize which technologies to use. 
    - Understand Tone.js and how to utilize midi files in the program. 
    - Research music theory to find recommended melody notes dependent on chord progression.
    
- Saturday: 
    - Create all keyboard keys and illuminate create toggle logic for when a note is recommended, and also when it is being pressed
- Sunday: 
    - Create logic of chord progression expressing which melody notes will be recommended
- Monday: 
    - Set up event listeners for each button to play a given sound. 
- Tuesday: 
    - Find 8-bit pixel art to improve UI
    - Use a piano visualizer
- Wednesday: 
    - Continue to improve UI
