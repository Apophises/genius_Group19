// בדיקת פונקציית playSound
const playSound = require('./playSound');

test('should play the sound with the given source', () => {
    const mockElement = {
        src: '',
        play: jest.fn()
    };
    jest.spyOn(global.document, 'getElementById').mockReturnValue(mockElement);

    const soundSrc = 'testSound.ogg';
    playSound(soundSrc);
    expect(mockElement.src).toBe(soundSrc);
    expect(mockElement.play).toHaveBeenCalled();
});