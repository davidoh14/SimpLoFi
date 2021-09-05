const chord = document.querySelectorAll('.chord')

function playChord(chord){
    const noteAudio = document.getElementById(chord.dataset.chord)
    noteAudio.play()
    noteAudio.loop()
    chord.classList.add('active')
}

module.exports = Chord;