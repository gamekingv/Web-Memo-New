<template>
    <v-card :width="300" class="ma-3" color="rgb(48, 48, 48)" flat>
        <v-toolbar :color="isToday ? 'teal' : 'grey darken-2'" dark flat>
            <v-toolbar-title>{{dateText[day - 1]}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = true" icon>
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <drag-list :changeHandler="saveList" :list="items" group="anime">
                <v-list-tile @click.stop avatar slot-scope="{ hover, item }">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-icon small style="vertical-align:middle" v-if="item.remark" v-on="on">error_outline</v-icon>
                                </template>
                                <span>{{item.remark}}</span>
                            </v-tooltip>
                            {{ item.name }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.sub }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title :class="isToday ? 'teal--text' : ''">{{ `第 ${item.num} 话${item.total ? `（共 ${item.total} 话）` : ''}` }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-list-tile-action-text>{{ item.time }}</v-list-tile-action-text>
                        <v-fade-transition>
                            <div v-show="hover">
                                <v-btn @click.stop="item.num--; saveList()" class="ma-0 no-drag" icon small>
                                    <v-icon small>remove</v-icon>
                                </v-btn>
                                <v-btn @click.stop="item.num++; saveList()" class="ma-0 no-drag" icon small>
                                    <v-icon small>add</v-icon>
                                </v-btn>
                                <v-btn @click.stop="editItem(item)" class="ma-0 no-drag" icon small>
                                    <v-icon small>edit</v-icon>
                                </v-btn>
                            </div>
                        </v-fade-transition>
                    </v-list-tile-action>
                </v-list-tile>
                <div slot="blank-text">今天没有追番</div>
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
                            <v-flex xs12>
                                <v-text-field label="剧名" v-model="edit.name"></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field label="字幕来源" v-model="edit.sub"></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field label="备注" v-model="edit.remark"></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field label="当前话数" v-model="edit.num"></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field label="总话数" v-model="edit.total"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <p style="color:rgba(255,255,255,0.7)">放送时间</p>
                                <v-time-picker color="blue" format="24hr" full-width landscape v-model="edit.time"></v-time-picker>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteItem()" color="error" flat v-if="editing">删除</v-btn>
                    <v-btn @click="dialog = false; resetForm()" color="secondary">取消</v-btn>
                    <v-btn @click="saveEdit" color="blue">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import dragList from './DragList';
import storage from '../utils/storage';

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
    data: () => ({
        dateText: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        dialog: false,
        editing: false,
        edit: {
            name: '',
            sub: '',
            num: '',
            total: '',
            time: '',
            remark: '',
            id: 0
        },
        items: []
    }),
    async created() {
        let { [`day${this.day}`]: items } = await storage.get(`day${this.day}`);
        if (items) this.items = items;
    },
    methods: {
        editItem(item) {
            this.editing = true;
            this.dialog = true;
            this.resetForm();
            for (let key in item)
                this.edit[key] = item[key];
        },
        saveEdit() {
            this.dialog = false;
            if (this.editing) {
                let note = this.items[this.items.findIndex(n => n.id == this.edit.id)];
                for (let noteItem in this.edit)
                    note[noteItem] = this.edit[noteItem];
            }
            else {
                this.edit.id = Date.now();
                this.items.push({ ...this.edit });
            }
            this.resetForm();
            this.editing = false;
            this.saveList();
        },
        deleteItem() {
            this.dialog = false;
            this.items.splice(this.items.findIndex(n => n.id == this.edit.id), 1);
            this.resetForm();
            this.editing = false;
            this.saveList();
        },
        resetForm() {
            this.edit = {
                name: '',
                sub: '',
                num: '',
                total: '',
                time: '',
                remark: '',
                id: 0
            };
        },
        saveList() {
            storage.set(`day${this.day}`, this.items);
        }
    }
};
</script>
