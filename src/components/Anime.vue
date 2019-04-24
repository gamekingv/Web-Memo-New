<template>
    <v-card :width="300" class="mt-3 mx-3 d-inline-block" color="rgb(48, 48, 48)" flat>
        <v-toolbar :color="isToday ? 'pink' : 'grey darken-2'" dark flat>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <v-toolbar-title>{{dateText[day - 1]}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <template v-for="(item, index) in items">
                <v-list-tile :key="item.title" avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                        <v-icon color="grey lighten-1" v-if="selected.indexOf(index) < 0">star_border</v-icon>
                        <v-icon color="yellow darken-2" v-else>star</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
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
        }
    },
    data() {
        return {
            dateText: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            selected: [2],
            items: [
                {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    title: 'Ali Connors',
                    subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                },
                {
                    action: '2 hr',
                    headline: 'Summer BBQ',
                    title: 'me, Scrott, Jennifer',
                    subtitle: "Wish I could come, but I'm out of town this weekend."
                },
                {
                    action: '6 hr',
                    headline: 'Oui oui',
                    title: 'Sandra Adams',
                    subtitle: 'Do you have Paris recommendations? Have you ever been?'
                },
                {
                    action: '12 hr',
                    headline: 'Birthday gift',
                    title: 'Trevor Hansen',
                    subtitle: 'Have any ideas about what we should get Heidi for her birthday?'
                },
                {
                    action: '18hr',
                    headline: 'Recipe to try',
                    title: 'Britta Holt',
                    subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
                }
            ]
        };
    }
};
</script>
