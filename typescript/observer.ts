interface IStationObservable {
	add(observer: IStationObserver): void;
	remove(observer: IStationObserver): void;
	notify(): void;
}

interface IStationObserver {
	update(temp: number): void;
}

class WeatherStation implements IStationObservable {
	private list: Array<IStationObserver> = [];

	constructor() {
		this.list = [];
	}

	add(observer: IStationObserver): void {
		if (this.list.indexOf(observer) > -1) {
			this.list.push(observer);
		}
	}

	remove(observer: IStationObserver): void {
		if (this.list.indexOf(observer) !== -1) {
			return;
		}
		this.list = this.list.filter((i) => i !== observer);
	}

	notify(): void {
		for (const o of this.list) {
			o.update(this.getTemp());
		}
	}

	private getTemp(): number {
		return Math.random() * 300;
	}
}

class WeatherObserver implements IStationObserver {
	private name: string;

	constructor(name: string) {
		this.name = name;
	}

	update(temp: number) {
		console.log("UPDATE for", this.name, temp);
	}
}

const ws = new WeatherStation();
const s1 = new WeatherObserver("s1");
const s2 = new WeatherObserver("s2");
const s3 = new WeatherObserver("s3");

ws.add(s1);
ws.add(s2);
ws.add(s3);

ws.notify();

ws.remove(s2);
ws.notify();
