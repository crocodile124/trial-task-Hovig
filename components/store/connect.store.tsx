import { makeObservable, observable } from "mobx";

class Store {
    connect = false;

    constructor() {
        makeObservable(this, {
            connect: observable,
        })
    }

    setConnect(data: boolean) {
        this.connect = data;
    }
}

export default new Store();