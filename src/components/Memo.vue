<template>
    <v-card :width="300" class="ma-3" color="rgb(48, 48, 48)" flat>
        <v-toolbar color="blue" dark flat>
            <v-toolbar-title>{{headerText[type]}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = true" icon>
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <drag-list :changeHandler="saveList" :list="items" group="memo">
                <v-list-tile @click.stop avatar slot-scope="{ hover, item }">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.field1 }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.field2 }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ item.time }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-fade-transition>
                            <div v-show="hover">
                                <v-btn @click.stop="editItem(item)" class="ma-0 no-drag" icon small>
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
                            <v-flex xs12>
                                <v-text-field label="字段1" v-model="edit.field1"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="字段2" v-model="edit.field2"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-menu :close-on-content-click="false" full-width max-width="290" v-model="datePicker">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field :value="edit.time" clearable label="时间" prepend-icon="calendar_today" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker @change="datePicker = false" v-model="edit.time"></v-date-picker>
                                </v-menu>
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
    name: 'Memo',
    props: {
        type: String
    },
    components: {
        dragList
    },
    data: () => ({
        headerText: {
            song: '歌曲',
            film: '电影',
            anime: '动画',
            game: '游戏'
        },
        dialog: false,
        editing: false,
        datePicker: false,
        edit: {
            field1: '',
            field2: '',
            time: '',
            id: 0
        },
        items: [],
    }),
    async created() {
        let { [this.type]: items } = await storage.get(this.type);
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
                field1: '',
                field2: '',
                time: '',
                id: 0
            };
        },
        saveList() {
            storage.set(this.type, this.items);
        }
    }
};
</script>
