<script lang="ts">

import { flip } from "svelte/animate";
import { createEventDispatcher } from "svelte";

interface Item {
    id: string;
    index: number;
    [key: string]: any;
  }

export let list: any[];
let isOver: string | boolean = false;

const dispatch = createEventDispatcher();

const reorder = ({ from, to }: any) => {
  const newList = [...list];
  const temp = newList[from]; // Armazena temporariamente o valor de 'from'
  newList[from] = newList[to]; // Substitui o valor de 'from' pelo valor de 'to'
  newList[to] = temp; // Coloca o valor armazenado temporariamente na posição 'to'

  dispatch("sort", newList);
  list = newList;
};

// -- gets the element beign drag
function getDraggedParent(node: any){
    if(!node.dataset.index){
        return getDraggedParent(node.parentNode);
    } else {
        return { ...node.dataset } as Item;
    }
}

function onDragStart(e: DragEvent){
    // @ts-ignore
    const dragged = getDraggedParent(e.target);
    e.dataTransfer?.setData("source", dragged?.index.toString());
}

function onDragOver(e: DragEvent){
    //@ts-ignore
    // const id = e.target.dataset?.id;
    const dragged = getDraggedParent(e.target);
    isOver = dragged?.id ?? false;
}

function onDragLeave(e: DragEvent){
    const dragged = getDraggedParent(e.target);
    isOver === dragged.id && (isOver = false);
}

function onDrop(e: DragEvent){
    isOver = false;
    const dragged = getDraggedParent(e.target);
    reorder({
        from: Number(e.dataTransfer?.getData("source")),
        to: Number(dragged.index),
    })
}

</script>


{#if list?.length}
<ul class="">
    {#each list as item, index (item.id)}
    <li 
    class="border-2 border-dashed border-transparent transition-all max-w-md w-full"
    class:over={item.id === isOver}
    data-index={index}
    data-id={item.id}
    draggable="true"
    on:dragstart={onDragStart}
    on:dragover|preventDefault={onDragOver}
    on:dragleave={onDragLeave}
    on:drop|preventDefault={onDrop}
    animate:flip={{ duration: 300 }}
    ><slot {item} {index}/></li>
    {/each}
</ul>
{:else}
<p class="">No links.</p>
{/if}

<style>
  .over {
    @apply border-gray-400 scale-105;
  }

</style>
