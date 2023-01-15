type playerKeyboardEventsOptions = {
    setIsMovingUp: (isActive: boolean) => void;
    setIsMovingLeft: (isActive: boolean) => void;
    setIsMovingDown: (isActive: boolean) => void;
    setIsMovingRight: (isActive: boolean) => void;
};

export function setupPlayerKeyboardEvents(
    options: playerKeyboardEventsOptions,
) {
    const {
        setIsMovingUp,
        setIsMovingLeft,
        setIsMovingDown,
        setIsMovingRight,
    } = options;

    window.addEventListener('keydown', (event) => {
        if (!event.repeat) {
            switch (event.code) {
                case 'KeyW':
                    setIsMovingUp(true);
                    break;

                case 'KeyA':
                    setIsMovingLeft(true);
                    break;

                case 'KeyS':
                    setIsMovingDown(true);
                    break;

                case 'KeyD':
                    setIsMovingRight(true);
                    break;
            }
        }
    });

    window.addEventListener('keyup', (event) => {
        switch (event.code) {
            case 'KeyW':
                setIsMovingUp(false);
                break;

            case 'KeyA':
                setIsMovingLeft(false);
                break;

            case 'KeyS':
                setIsMovingDown(false);
                break;

            case 'KeyD':
                setIsMovingRight(false);
                break;
        }
    });
}
