const app = Vue.createApp({
    data() {
        return {
            replaceText: "Untra Boy",
            firstName: "Han Phu",
            lastName: "Th",
            isShowModal: false,
        };
    },
    methods: {
        onChangeName() {
            this.firstName = 'Skype';
            this.lastName = 'Adele';
        },
        onShowModal() {
            this.isShowModal = !this.isShowModal;
        },
    }
});

const app1 = Vue.createApp({
    template: `<h1>Print variable from {{ replaceText }} and {{ firstName + "-" + lastName }}</h1>
    <button v-on:click="firstName = 'Hanh Phuc'">Change name</button>&emsp;
    <button v-on:click="onChangeName">Change name type 2</button>&emsp;
    <button @click="onChangeName">Change name type 3</button><br><br>

    <button @click="onShowModal">Show hide model</button><br>
    <div class="modal" v-if="isShowModal">
        <h1>Modal Hidden V If</h1>
    </div>
    <div class="modal" v-show="isShowModal">
        <h1>Modal Hidden V Show</h1>
    </div>`,

    data() {
        return {
            replaceText: "Untra Boy",
            firstName: "Han Phu",
            lastName: "Th",
            isShowModal: false,
        };
    },
    methods: {
        onChangeName() {
            this.firstName = 'Skype';
            this.lastName = 'Adele';
        },
        onShowModal() {
            this.isShowModal = !this.isShowModal;
        },
    }
});

app.mount("#contact");

app1.mount("#section2");

const app2 = Vue.createApp({
    data() {
        return {
            eventType: "",
        };
    },
    methods: {
        onShowEvent(event) {
            this.eventType = event.type;
        }
    }
});
app2.mount("#section3");

const app3 = Vue.createApp({
    data() {
        return {
            products: [
                {
                    name: "A",
                    color: "#ffee11"
                },
                {
                    name: "B",
                    color: "#de3e2f"
                },
                {
                    name: "C",
                    color: "#7efe2f"
                }
            ],
        };
    },
    methods: {
        
    }
});
app3.mount("#section4");