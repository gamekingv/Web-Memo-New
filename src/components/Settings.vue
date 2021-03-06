<template>
    <v-layout class="px-5" column>
        <v-layout class="my-4">
            <v-btn @click.native="$refs.selectFile.click()" color="blue">导入配置</v-btn>
            <input @change="importConfig" accept="application/json" ref="selectFile" type="file" v-show="false">
            <v-btn @click="exportConfig">导出配置</v-btn>
        </v-layout>
        <v-layout class="mb-4">
            <v-flex align-self-center xs2>
                <v-subheader>自动同步</v-subheader>
            </v-flex>
            <v-flex align-self-center xs10>
                <v-switch @change="toggleAutoSync" class="mt-0 pt-0" color="blue" hide-details v-model="isAutoSync"></v-switch>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs2>
                <v-subheader>同步频率</v-subheader>
            </v-flex>
            <v-flex xs4>
                <v-select
                    :items="[{ text: '每小时', value: 'hourly' }, { text: '每天', value: 'daily' }, { text: '每周', value: 'weekly' }]"
                    @input="changeAutoSyncFrequency"
                    required
                    solo
                    v-model="frequency"
                ></v-select>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5>
                <v-btn :disabled="synchronizing" :loading="synchronizing" @click="synchronize" color="blue">立即同步</v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs2>
                <v-subheader>仓库链接</v-subheader>
            </v-flex>
            <v-flex xs10>
                <v-text-field @change="updateSetting" prefix="https://github.com/" solo v-model="link"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs2>
                <v-subheader>token</v-subheader>
            </v-flex>
            <v-flex xs10>
                <v-text-field @change="updateSetting" solo v-model="token"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs2>
                <v-subheader>上次同步记录</v-subheader>
            </v-flex>
            <v-flex align-self-center v-if="last.time > -1" xs10>
                <v-icon :color="last.success ? 'success' : 'error'" class="mr-1" style="vertical-align: middle;">{{last.success ? 'done' : 'clear'}}</v-icon>
                {{`于${timeFormatter(last.time)}同步${last.success ? '成功' : `失败${last.successTime > -1 ? `（最近一次于${timeFormatter(last.successTime)}同步成功）` : ''}：`}${last.success ? '' : last.message}`}}
            </v-flex>
            <v-flex align-self-center v-else xs10>暂无同步记录</v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import storage from '../utils/storage';

export default {
    props: {
        last: Object,
        synchronizing: Boolean
    },
    data: () => ({
        link: '',
        token: '',
        isAutoSync: false,
        frequency: 'daily'
    }),
    async created() {
        let { synchronization } = await storage.get('synchronization');
        if (synchronization) {
            this.link = synchronization.link;
            this.token = synchronization.token;
            this.isAutoSync = synchronization.isAutoSync;
            this.frequency = synchronization.frequency;
        }
    },
    methods: {
        timeFormatter(timeString) {
            let time = new Date(timeString);
            return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${('0' + time.getHours()).substr(-2)}:${('0' + time.getMinutes()).substr(-2)}`;
        },
        async synchronize() {
            await this.updateSetting();
            this.$emit('synchronize');
        },
        async toggleAutoSync() {
            await this.updateSetting();
            if (this.isAutoSync) await this.$emit('autoSync');
            else this.$emit('stopSync');
        },
        async changeAutoSyncFrequency() {
            await this.updateSetting();
            this.$emit('stopSync');
            await this.$emit('autoSync');
        },
        async updateSetting() {
            let synchronization = {
                isAutoSync: this.isAutoSync,
                frequency: this.frequency,
                link: this.link,
                token: this.token,
            };
            await storage.set('synchronization', synchronization);
        },
        async exportConfig() {
            let a = document.createElement('a');
            a.download = 'memo.json';
            a.style.display = 'none';
            document.body.appendChild(a);
            let file = new Blob([JSON.stringify(await storage.get())], { type: 'application/json' });
            a.href = URL.createObjectURL(file);
            a.click();
            document.body.removeChild(a);
        },
        importConfig(e) {
            let reader = new FileReader();
            reader.addEventListener('loadend', async event => {
                try {
                    let configs = JSON.parse(event.target.result);
                    for (let key in configs) {
                        await storage.set(key, configs[key]);
                    }
                    window.location.reload();
                }
                catch (e) { throw e; }
            });
            reader.readAsText(e.target.files[0]);
        },
    }
};
</script>
