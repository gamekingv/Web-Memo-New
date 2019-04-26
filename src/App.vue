<template>
    <v-app dark>
        <v-tabs color="grey darken-4" fixed-tabs slider-color="blue" v-model="tab">
            <v-tab key="anime" ripple>新番</v-tab>
            <v-tab key="memo" ripple>备忘</v-tab>
            <v-tab key="option" ripple>选项</v-tab>
        </v-tabs>
        <v-tabs-items class="tab-items-row" v-model="tab">
            <v-tab-item key="anime">
                <v-layout align-content-start justify-center wrap>
                    <anime :day="n" :key="n" v-for="n in 7"/>
                </v-layout>
            </v-tab-item>
            <v-tab-item key="memo">
                <v-layout align-content-start justify-center wrap>
                    <memo type="song"/>
                    <memo type="film"/>
                    <memo type="anime"/>
                    <memo type="game"/>
                </v-layout>
            </v-tab-item>
            <v-tab-item key="option">
                <settings :last="last" :synchronizing="synchronizing" @autoSync="autoSync" @stopSync="stopSync" @synchronize="synchronize"/>
            </v-tab-item>
        </v-tabs-items>
        <v-dialog :width="500" content-class="grey darken-4" v-model="newConfigAlert">
            <v-card class="grey darken-4">
                <v-card-text class="my-4">{{'检测到github有更新的配置，是否替换本地配置？（选择“否”将强制同步配置到github，如果不想这样做请选择“取消”）'}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="replaceLocalConfig" color="blue">是</v-btn>
                    <v-btn @click="forceSynchronizing" color="secondary">否</v-btn>
                    <v-btn @click="cancelSynchronizing" color="blue" outline>取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import Anime from './components/Anime';
import Memo from './components/Memo';
import Settings from './components/Settings';
import storage from './utils/storage';
import sync from './utils/sync';

export default {
    name: 'App',
    components: {
        Anime,
        Memo,
        Settings
    },
    async created() {
        await this.updateLast();
        sync.init(this);
    },
    data: () => ({
        tab: 0,
        last: {
            time: -1,
            successTime: -1,
            success: false,
            message: ''
        },
        config: {},
        loading: false,
        synchronizing: false,
        newConfigAlert: false
    }),
    methods: {
        async synchronize(isForced = false) {
            this.synchronizing = true;
            await sync.synchronize(isForced);
            await this.updateLast();
            this.synchronizing = false;
        },
        async updateLast() {
            let { last } = await storage.get('last');
            if (last) this.last = last;
        },
        async autoSync() {
            await sync.autoSync();
        },
        stopSync() {
            sync.stopSync();
        },
        newConfigDetected(config) {
            this.newConfigAlert = true;
            this.config = config;
        },
        async replaceLocalConfig() {
            this.newConfigAlert = false;
            if (this.config.last) {
                [this.config.last.time, this.config.last.successTime] = Array(2).fill(Date.now());
            }
            for (let key in this.config) {
                await storage.set(key, this.config[key]);
            }
            window.location.reload();
        },
        async forceSynchronizing() {
            this.newConfigAlert = false;
            this.config = {};
            await this.synchronize(true);
            await this.updateLast();
        },
        cancelSynchronizing() {
            this.newConfigAlert = false;
            this.config = {};
        }
    }
};
</script>

<style scoped>
.tab-items-row,
.tab-items-row >>> .v-window__container,
.tab-items-row >>> .v-window-item {
    height: 100%;
}
.tab-items-row {
    overflow-y: scroll;
    height: calc(100% - 48px);
}
</style>