<template>
    <v-card :width="300" class="mt-3 mx-3 d-inline-block" color="rgb(48, 48, 48)" flat>
        <v-toolbar :color="isToday ? 'teal' : 'grey darken-2'" dark flat>
            <v-toolbar-title>{{dateText[day - 1]}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <template v-for="(item, index) in items">
                <v-hover :key="`l-${index}`">
                    <v-list-tile @click avatar slot-scope="{ hover }">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.sub }}</v-list-tile-sub-title>
                            <v-hover>
                                <v-list-tile-sub-title class="teal--text" slot-scope="{ hover }">
                                    <span class="opr-num" v-if="hover">{{'－'}}</span>
                                    <span v-else>第</span>
                                    {{ ` ${item.num} ` }}
                                    <span class="opr-num" v-if="hover">{{'＋'}}</span>
                                    <span v-else>话</span>
                                </v-list-tile-sub-title>
                            </v-hover>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{ item.time }}</v-list-tile-action-text>
                            <v-fade-transition>
                                <v-btn class="ma-0" icon small v-show="hover">
                                    <v-icon color="grey lighten-1" small>edit</v-icon>
                                </v-btn>
                            </v-fade-transition>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-hover>
                <v-divider :key="index" v-if="index + 1 < items.length"></v-divider>
            </template>
        </v-list>
    </v-card>
</template>

<script>
import HelloWorld from './HelloWorld';

export default {
    name: 'Anime',
    props: {
        day: Number
    },
    components: {
        HelloWorld
    },
    computed: {
        isToday() {
            return new Date().getDay() % 7 === this.day;
        },
    },
    data() {
        return {
            dateText: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            selected: [2],
            items: [
                {
                    name: '盾之勇者成名录',
                    sub: 'bilibili',
                    num: '12',
                    time: '22:00'
                },
                {
                    name: '盾之勇者成名录',
                    sub: 'bilibili',
                    num: '12',
                    time: '22:00'
                }
            ]
        };
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
