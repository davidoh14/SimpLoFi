const keyboard = ['1', '2', '3','4', '5', '6', '7', '8', '9', '0', '-', 
'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

const keys = document.querySelectorAll('.key')


keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
    key.addEventListener('onkeydown', () => playNote(key))
    key.addEventListener('onkeyup', ()=> stopNote(key))
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
    console.log('WORK')

    if (keyIndex > -1) stopNote(keys[keyIndex])
})

function playNote(key){
    const noteAudio = document.getElementById(key.dataset.note)
    console.log(noteAudio);
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add('active')
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}

function stopNote(key){
    const noteAudio = document.getElementById(key.dataset.note)
    // noteAudio.pause()
    note.classList.remove('active')
    console.log(noteAudio.currentTime)

}

