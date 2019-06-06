import { observable, action } from 'mobx';
import Ajax from '../libs/ajax';

export default class AppStore {
    @observable author;
    @observable message;
    @observable remoteInfo;

    constructor() {
        this.author = "cat";
    }

    async getName() {
        Ajax.get('/test/api/queryName').then(res => {
            this.setAuthorName(res);
        })
    }

    async getRemoteInfo() {
        Ajax.get('/member/getUserVO.do').then(res => {
            this.setRemoteInfo(res);
        })
    }

    @action setAuthorName(data) {
        this.author = data.entry;
        this.message = data.message;
    }

    @action setRemoteInfo(data) {
        this.remoteInfo = data;
    }
}