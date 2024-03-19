<script setup>
import {$reactiveState} from "./store/store";
import Header from "./components/Header.vue";

</script>
<template>
    <div class="background h-full w-full absolute z-[-1]" aria-hidden="true">
        <picture
            class="block h-full overflow-hidden"
            v-if="$reactiveState.dark"
        >
            <source
                media="(min-width: 1199px)"
                srcset="/pattern-background-desktop-dark.svg"
            />
            <source
                media="(min-width: 768px)"
                srcset="/pattern-background-tablet-dark.svg"
            />
            <img
                class="w-full h-full"
                src="/pattern-background-mobile-dark.svg"
                alt="background image"
            />
        </picture>
        <picture class="block h-full overflow-hidden" v-else>
            <source
                media="(min-width: 1199px)"
                srcset="/pattern-background-desktop-light.svg"
            />
            <source
                media="(min-width: 768px)"
                srcset="/pattern-background-tablet-light.svg"
            />
            <img
                class="w-full h-full"
                src="/pattern-background-mobile-light.svg"
                alt="background image"
            />
        </picture>
    </div>
    <Header />
    <main role="main" class="mt-16" aria-label="main content">
        <RouterView />
    </main>
</template>
