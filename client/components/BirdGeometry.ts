declare const THREE: any;

let w = 0;

class BirdGeometry extends (THREE.BufferGeometry as { new(): any; }) {
    public static vertsPush(verticeArray: number[], dots: number[]) {
        for (const i of dots) {
            verticeArray[w++] = i;
        }
    }

    constructor(BIRDS: number, WIDTH: number) {
        super();
        const triangles = BIRDS * 3;
        const points = triangles * 3;
        const wingsSpan = 20;
        const vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
        const birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
        const references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
        const birdVertex = new THREE.BufferAttribute(new Float32Array(points), 1);
        this.addAttribute('position', vertices);
        this.addAttribute('birdColor', birdColors);
        this.addAttribute('reference', references);
        this.addAttribute('birdVertex', birdVertex);

        for (let f = 0; f < BIRDS; f++) {
            // Body
            BirdGeometry.vertsPush(
                vertices.array,
                [
                    0, -0, -20,
                    0, 4, -20,
                    0, 0, 30,
                ],
            );
            // Left Wing
            BirdGeometry.vertsPush(
                vertices.array,
                [
                    0, 0, -15,
                    -wingsSpan, 0, 0,
                    0, 0, 15,
                ],
            );
            // Right Wing
            BirdGeometry.vertsPush(
                vertices.array,
                [
                    0, 0, 15,
                    wingsSpan, 0, 0,
                    0, 0, -15,
                ],
            );
        }
        for (let v = 0; v < triangles * 3; v++) {
                const i = ~~(v / 3);
                const x = (i % WIDTH) / WIDTH;
                const y = ~~(i / WIDTH) / WIDTH;
                const c = new THREE.Color(
                    'skyblue',
                );
                birdColors.array[ v * 3 + 0 ] = c.r;
                birdColors.array[ v * 3 + 1 ] = c.g;
                birdColors.array[ v * 3 + 2 ] = c.b;
                references.array[ v * 2     ] = x;
                references.array[ v * 2 + 1 ] = y;
                birdVertex.array[ v         ] = v % 9;
            }
        this.scale(0.2, 0.2, 0.2);
    }
}

export default BirdGeometry;
