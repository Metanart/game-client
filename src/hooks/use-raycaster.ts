import { useMemo } from 'react';

import { ArrowHelper, Object3D, Raycaster, Vector3 } from 'three';

import { useThree } from '@react-three/fiber';

import { Colors } from 'tokens/colors';

export const useRaycaster = (object3D: Object3D | null) => {
    const scene = useThree((state) => state.scene);
    const intersectedObjects = scene.children;

    const startingPoint = useMemo(() => new Vector3(), []);
    const endingPoint = useMemo(() => new Vector3(), []);
    const direction = useMemo(() => new Vector3(), []);
    const raycaster = useMemo(() => new Raycaster(), []);
    const distance = 10;

    const arrowHelper = useMemo(() => {
        const arrowHelper = new ArrowHelper(startingPoint, direction, distance, Colors.Red);
        scene.add(arrowHelper);
        return arrowHelper;
    }, []);

    return {
        getIntersections: () => {
            object3D?.getWorldPosition(startingPoint);
            object3D?.getWorldDirection(direction.normalize());

            endingPoint.addVectors(startingPoint, direction.normalize().multiplyScalar(distance));

            arrowHelper.setDirection(direction.normalize());
            arrowHelper.position.set(startingPoint.x, startingPoint.y, startingPoint.z);

            raycaster.set(startingPoint, direction.normalize());

            const intersections = raycaster.intersectObjects(intersectedObjects);

            return intersections;
        },
    };
};
