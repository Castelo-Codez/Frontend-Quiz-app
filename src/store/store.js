import {reactive, watch} from "vue";

const $reactiveState = reactive({
    dark: false,
});

if (window.localStorage.getItem("theme")) {
    $reactiveState.dark = true;
    document.documentElement.classList.add("dark");
}

watch(
    () => $reactiveState.dark,
    (newState) => {
        if (newState) {
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            window.localStorage.removeItem("theme");
            document.documentElement.classList.remove("dark");
        }
    }
);

export {$reactiveState};
