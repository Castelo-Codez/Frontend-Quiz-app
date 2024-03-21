<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import data from "../../data.json";
const $route = useRoute();
const $status = ref("Next Question");
const {quizzes} = data;
const $anwersArran = ref(["A", "B", "C", "D"]);
const $rightAnswer = ref();
const $wrongAnswer = ref();
const $answer = ref();
const $isCompleted = ref(false);
const $nextQues = ref(false);
const $hasError = ref(false);
const $finalResult = ref(0);
const $currentQuiz = ref(
    quizzes.find(
        (el) => el.title.toUpperCase() === $route.params.id.toUpperCase()
    )
);
const $questionNum = ref(1);
const $questionsArrLength = ref($currentQuiz.value.questions.length);
const $currentQuestion = computed(() => {
    return $currentQuiz.value.questions[$questionNum.value - 1];
});
function $submitAnswer() {
    let $validation = $check();
    if ($validation) {
        $rightAnswer.value = $currentQuestion.value.answer;
        if ($answer.value === $currentQuestion.value.answer) {
            $finalResult.value = $finalResult.value + 1;
        }
        if ($answer.value !== $currentQuestion.value.answer) {
            $wrongAnswer.value = $answer.value;
        }
        $nextQues.value = true;
        if ($questionNum.value >= $questionsArrLength.value) {
            $status.value = "See Results";
        }
    }
}

function $check() {
    if (!$answer.value) {
        $hasError.value = true;
        return false;
    } else {
        $hasError.value = false;
        return true;
    }
}

function $moveNextQuestion() {
    if ($questionNum.value >= $questionsArrLength.value) {
        $isCompleted.value = true;
        $questionNum.value = 1;
        return;
    } else {
        $questionNum.value = $questionNum.value + 1;
        $nextQues.value = false;
        $answer.value = null;
        $rightAnswer.value = null;
        $wrongAnswer.value = null;
    }
}
</script>
<template>
    <section aria-label="quiz section">
        <div
            class="container absolute pt-m-padd left-2/4 -translate-x-2/4 top-0 grid grid-cols-1 gap-y-2 sm:grid sm:grid-cols-headerLogo sm:items-center sm:gap-y-0 sm:grid- sm:gap-x-4 text-clr-dark-navy dark:text-clr-light-grey font-[500] text-[1.5rem]"
            aria-label="quiz info"
        >
            <div
                aria-label="logo wrapper"
                class="flex justify-center items-center py-2 rounded-lg w-[45px] h-[45px]"
                :class="$route.query.bgLogo"
            >
                <img
                    :src="$currentQuiz.icon"
                    :alt="$currentQuiz.title + 'icon'"
                />
            </div>
            <span aria-label=" quiz name">
                {{ $currentQuiz.title }}
            </span>
        </div>
        <div
            v-if="$isCompleted"
            class="container grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-28"
            aria-label="content wrapper"
        >
            <div class="left" aria-label="section 1">
                <h1
                    aria-label="main heading"
                    class="dark:text-clr-light-grey text-[12vw] sm:text-[8vw] md:tex-[7vw] lg:text-[4vw] leading-[1.2] font-[300] text-clr-dark-navy"
                >
                    Quiz completed
                    <strong class="block font-[500]">You scored...</strong>
                </h1>
            </div>
            <div
                class="right rounded-3xl p-10 flex items-center flex-col gap-y-4 bg-white dark:bg-clr-navy"
                aria-label="result section"
            >
                <div
                    aria-label="section info"
                    class="text-clr-dark-navy dark:text-white flex gap-x-3 items-center text-[1.5rem] font-[600]"
                >
                    <div
                        class="flex justify-center items-center py-2 rounded-lg w-[45px] h-[45px]"
                        :class="$route.query.bgLogo"
                    >
                        <img
                            :src="$currentQuiz.icon"
                            :alt="$currentQuiz.title + 'icon'"
                        />
                    </div>
                    <span aria-label=" quiz name">
                        {{ $currentQuiz.title }}
                    </span>
                </div>
                <span
                    aria-label="result number"
                    class="result text-[5rem] font-[800] text-clr-dark-navy dark:text-clr-light-grey"
                >
                    {{ $finalResult }}
                </span>
                <span class="text-[1.2rem] italic mt-5 text-clr-p">
                    out of 10
                </span>
                <RouterLink
                    class="w-full text-center bg-clr-purple text-clr-light-grey p-5 rounded-2xl text-[1.5rem] font-[500]"
                    to="/"
                >
                    Play Again
                </RouterLink>
            </div>
        </div>
        <div
            v-else
            class="container grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-24"
            aria-label="content wrapper"
        >
            <div class="left relative" aria-label="question section">
                <span
                    aria-label="question number"
                    class="text-clr-p block mb-3 italic text-[1.2rem]"
                >
                    Question {{ $questionNum }} of

                    {{ $currentQuiz.questions.length }}
                </span>
                <h1
                    aria-label="question"
                    class="dark:text-clr-light-grey text-[7vw] sm:text-[6vw] md:tex-[5vw] lg:text-[3vw] leading-[1.2] font-[400] text-clr-dark-navy"
                >
                    {{ $currentQuestion.question }}
                </h1>
                <div
                    class="absolute -bottom-5 lg:bottom-20 w-full bg-gray-200 rounded-full h-2.5 dark:bg-clr-navy"
                    aria-label="progress bar"
                >
                    <div
                        aria-hidden="true"
                        class="bg-clr-purple h-2.5 rounded-full"
                        :style="{width: `${$questionNum}0%`}"
                    ></div>
                </div>
            </div>
            <div class="right" aria-label="answers section">
                <ul
                    class="flex flex-col w-full gap-6"
                    aria-label="list of answers"
                >
                    <li
                        role="listitem"
                        aria-label="answer container"
                        v-for="(answer, index) in $currentQuestion.options"
                    >
                        <input
                            type="radio"
                            :id="'answer' + index"
                            name="answer"
                            :value="answer"
                            class="hidden peer"
                            v-model="$answer"
                        />
                        <label
                            :for="'answer' + index"
                            class="flex gap-x-5 font-[700] group items-center text-[5vw] sm:text-[1.3rem] w-full p-5 dark:text-clr-light-grey text-clr-dark-navy bg-white border-[2px] rounded-2xl cursor-pointer hover:bg-gray-100 dark:bg-clr-navy"
                            :class="[
                                $rightAnswer === answer
                                    ? 'border-clr-green dark:border-clr-green peer-checked:border-clr-green dark:peer-checked:border-clr-green'
                                    : $wrongAnswer === answer
                                    ? 'border-clr-red dark:border-clr-red peer-checked:border-clr-red dark:peer-checked:border-clr-red'
                                    : 'border-gray-200 dark:border-gray-700 peer-checked:border-clr-purple hover:border-clr-purple dark:hover:border-clr-purple',
                                ,
                            ]"
                        >
                            <span
                                aria-label="icon"
                                class="flex justify-center text-clr-dark-navy items-center py-2 rounded-lg bg-orange-50 w-[45px] h-[45px] group-hover:bg-clr-purple group-hover:text-clr-light-grey"
                            >
                                {{ $anwersArran[index] }}
                            </span>
                            {{ answer }}
                        </label>
                    </li>
                    <li
                        role="listitem"
                        aria-label="controllers container"
                        class="relative"
                    >
                        <button
                            v-if="$nextQues"
                            @click="$moveNextQuestion"
                            type="button"
                            class="w-full bg-clr-purple text-clr-light-grey p-5 rounded-2xl text-[1.3rem] font-[600]"
                        >
                            {{ $status }}
                        </button>
                        <button
                            v-else
                            type="submit"
                            class="w-full bg-clr-purple text-clr-light-grey p-5 rounded-2xl text-[1.3rem] font-[600]"
                            @click="$submitAnswer"
                        >
                            Submit
                        </button>

                        <span
                            v-if="$hasError"
                            aria-label="error msg"
                            class="flex gap-x-3 absolute -bottom-16 items-center text-[1.1rem] text-clr-red"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="none"
                                viewBox="0 0 40 40"
                            >
                                <path
                                    fill="#EE5454"
                                    d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"
                                />
                            </svg>
                            Please select an answer
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<style></style>
