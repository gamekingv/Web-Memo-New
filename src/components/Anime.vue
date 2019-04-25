<template>
    <v-card :width="300" class="mt-3 mx-3 d-inline-block" color="rgb(48, 48, 48)" flat>
        <v-toolbar :color="isToday ? 'teal' : 'grey darken-2'" dark flat>
            <v-toolbar-title>{{dateText[day - 1]}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = !dialog" icon>
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <drag-list :changeHandler="saveList" :list="items" :options="options">
                <v-list-tile @click avatar slot-scope="{ hover, item }">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.sub }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title :class="isToday ? 'teal--text' : ''">{{ `第 ${item.num} 话` }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-list-tile-action-text>{{ item.time }}</v-list-tile-action-text>
                        <v-fade-transition>
                            <div v-show="hover">
                                <v-btn @click.stop class="ma-0 no-drag" icon small>
                                    <v-icon small>remove</v-icon>
                                </v-btn>
                                <v-btn @click.stop class="ma-0 no-drag" icon small>
                                    <v-icon small>add</v-icon>
                                </v-btn>
                                <v-btn @click.stop class="ma-0 no-drag" icon small>
                                    <v-icon small>edit</v-icon>
                                </v-btn>
                            </div>
                        </v-fade-transition>
                    </v-list-tile-action>
                </v-list-tile>
                <div class="no-note no-drag" slot="blank-text">今天没有追番</div>
            </drag-list>
        </v-list>
        <v-dialog max-width="600px" persistent scrollable v-model="dialog">
            <v-card>
                <v-card-title>
                    <span class="headline">编辑</span>
                </v-card-title>
                <v-card-text>
                    <v-container class="py-0" grid-list-md>
                        <v-layout wrap>
                            <v-flex lg12>
                                <v-text-field label="剧名" v-model="edit.name"></v-text-field>
                            </v-flex>
                            <v-flex lg12>
                                <v-text-field label="字幕来源" v-model="edit.sub"></v-text-field>
                            </v-flex>
                            <v-flex lg6>
                                <v-text-field label="当前话数" v-model="edit.num"></v-text-field>
                            </v-flex>
                            <v-flex lg6>
                                <v-text-field label="总话数" v-model="edit.total"></v-text-field>
                            </v-flex>
                            <v-flex lg12>
                                <p style="color:rgba(255,255,255,0.7)">放送时间</p>
                                <v-time-picker color="blue" format="24hr" full-width landscape v-model="edit.time"></v-time-picker>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" color="blue" flat>取消</v-btn>
                    <v-btn @click="saveEdit" color="blue" flat>保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import dragList from './DragList.vue';

export default {
    name: 'Anime',
    props: {
        day: Number
    },
    components: {
        dragList
    },
    computed: {
        isToday() {
            return new Date().getDay() % 7 === this.day;
        },
    },
    data() {
        return {
            dateText: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            dialog: false,
            options: {
                group: 'anime',
                animation: 100,
                filter: '.no-drag'
            },
            edit: {
                name: '',
                sub: '',
                num: '',
                total: '',
                time: ''
            },
            items: [
                {
                    name: '盾之勇者成名录',
                    sub: 'bilibili',
                    num: '12',
                    time: '22:00',
                    id: 1
                },
                {
                    name: '盾之勇者成名录',
                    sub: 'bilibili',
                    num: '12',
                    time: '22:00',
                    id: 2
                }
            ]
        };
    },
    methods: {
        saveEdit() {
            console.log(JSON.stringify(this.edit));
        },
        saveList(e) {
            console.log(JSON.stringify(e));
        }
    }
};
</script>

<style scoped>
.opr-num {
    color: rgba(255, 255, 255, 0.7) !important;
}
.opr-num:hover {
    color: #009688 !important;
}
</style>
