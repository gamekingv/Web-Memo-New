<template>
    <v-card :width="300" class="ma-3" color="rgb(48, 48, 48)" flat>
        <v-toolbar color="blue" dark flat>
            <v-toolbar-title>{{headerText[type]}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = !dialog" icon>
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <drag-list :changeHandler="saveList" :list="items" :options="options">
                <v-list-tile @click avatar slot-scope="{ hover, item }">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.field1 }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.field2 }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ item.time }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-fade-transition>
                            <div v-show="hover">
                                <v-btn @click.stop class="ma-0 no-drag" icon small>
                                    <v-icon small>edit</v-icon>
                                </v-btn>
                            </div>
                        </v-fade-transition>
                    </v-list-tile-action>
                </v-list-tile>
                <div slot="blank-text">没有备忘</div>
            </drag-list>
        </v-list>
        <v-dialog lazy max-width="600px" persistent scrollable v-model="dialog">
            <v-card>
                <v-card-title>
                    <span class="headline">编辑</span>
                </v-card-title>
                <v-card-text>
                    <v-container class="py-0" grid-list-md>
                        <v-layout wrap>
                            <v-flex lg12>
                                <v-text-field label="字段1" v-model="edit.field1"></v-text-field>
                            </v-flex>
                            <v-flex lg12>
                                <v-text-field label="字段2" v-model="edit.field2"></v-text-field>
                            </v-flex>
                            <v-flex lg12>
                                <p style="color:rgba(255,255,255,0.7)">时间</p>
                                <v-date-picker color="blue" v-model="edit.time"></v-date-picker>
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
    name: 'Memo',
    data: () => ({
        headerText: {
            song: '歌曲',
            film: '电影',
            anime: '动画',
            game: '游戏'
        },
        dialog: false,
        options: {
            group: 'memo',
            animation: 100,
            filter: '.no-drag'
        },
        edit: {
            field1: '',
            field2: '',
            time: '',
            id: 0
        },
        items: [
            {
                field1: '盾之勇者成名录',
                field2: 'bilibili',
                time: '2019-04-04',
                id: 1
            },
            {
                field1: '盾之勇者成名录',
                field2: 'bilibili',
                time: '2019-04-04',
                id: 2
            }],
    }),
    components: {
        dragList
    },
    props: {
        type: String
    },
    methods: {
        saveEdit() {
            console.log(JSON.stringify(this.edit));
        },
        saveList(e) {
            console.log(JSON.stringify(e));
        }
    },
    created() {
    }
};
</script>
