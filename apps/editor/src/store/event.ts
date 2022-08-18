import { editorEvents } from "@/data";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { p } from "./project";

export const useEventStore = defineStore("event", () => {
    const currentType = ref<string>(editorEvents[0].type);
    const currentEvents = computed(
        () =>{
            return editorEvents.find((item) => item.type === currentType.value).events
        }
            
    );

    const currentEventType = ref<string>(currentEvents.value[0].name);
    const currentEventArgs = computed(
        () =>
        {
            const events = currentEvents.value.find(
                (item) => item.name === currentEventType.value
            );
            if(events) {
                return events.args
            }
            return undefined
        }

    );

    const currentEventArgValues = ref<any[]>([]);

    function onTypeChange(type: string) {
        currentType.value = type;
    }

    function saveEvent(page: number, elementId: string) {
        const { props } = p.getPageByIndex(page).getElementById(elementId);
        if (!props.events) {
            props.events = {};
        }
        props.events[`${currentType.value}:${currentEventType.value}`] = [
            ...currentEventArgValues.value,
        ];
    }

    function saveArgs(v: any, index: number) {
        currentEventArgValues.value[index] = v;
    }

    return {
        editorEvents,
        currentType,
        currentEventType,
        currentEvents,
        currentEventArgs,
        onTypeChange,
        saveEvent,
        saveArgs,
    };
});
