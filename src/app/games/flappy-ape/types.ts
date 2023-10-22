interface Shape {
	x: number
	y: number
}

export interface Circle extends Shape {
	radius: number
}

export interface Rectangle extends Shape {
	width: number
	height: number
}
