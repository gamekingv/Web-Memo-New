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
        synchronizing: false
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