<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="md:w-360px m-2 md:m-0 h-540px bg-yellow-400 flex flex-col rounded-25px md:absolute static" style="left: {left}px; top: {top}px; z-index: {zIndex}; box-shadow: 0 0 28px rgba(0, 0, 0, 0.1);" 
    on:mousedown={() => toFocus('toFocus', {z: zIndex, id: id})}>
    {#if editor}
        <div class="m-8px flex mx-12px">
            <div class="flex">
                <span
                    on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                    class:active={editor.isActive('heading', { level: 1 })}
                >
                    &#xF799;
                </span>
                <span   
                    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    class:active={editor.isActive('heading', { level: 2 })}
                >
                    &#xF79F;
                </span>
                <span on:click={() => editor.chain().focus().setParagraph().run()} 
                    class:active={editor.isActive('paragraph')}>
                    &#xF4B4;
                </span>
            </div>
            <div class="flex-grow cursor-move" on:mousedown={onMouseDown} on:touchstart={onTouchStart}></div>
        </div>  
    {/if}
    
    <div class="overflow-auto h-full m-8px bg-yellow-200 rounded-25px" bind:this={element} />
    <div class="pl-8px pb8px">
        <span class="text-red-600 p-8px cursor-pointer select-none font-$material_icons text-21px" on:click={() => removeEditor('removeEditor', id)}>&#xF78B;</span>
    </div>
</div>

<Bubblemenu bind:bubbleMenu={bubbleMenu} bind:editor={editor}/>


<svelte:window on:mouseup={onMoveEnd} on:mousemove={onMouseMove} on:resize={positionCorrection} on:touchend={onMoveEnd} on:touchmove={onTouchMove}/>


  

<style lang="postcss">
    div div div span{
        @apply rounded-1;
        padding: 8px;
        font-family: material_icons;
        font-size: 21px;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        user-select: none;
    }
    div div div span:hover{
        color: rgb(0, 0, 0);
    }
    span.active{
        color: rgb(0, 0, 0);
        background-color: rgba(20, 20, 20, 0.05);   
    }
    :global(code) {
        background-color: rgba(97, 97, 97, 0.5);
        border-radius: 0.25em;
        color: #616161;
        line-height: 25px;
        padding-inline: 0.25em;
    }
</style>

<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'
    import BubbleMenu from '@tiptap/extension-bubble-menu'

    import Bubblemenu from '$lib/bubbleMenu.svelte'
	import { e } from 'unocss';

    export var id:number;

    let left = 0;
	let top = 0;
    let initialleft: number;
    let initialtop: number;
    let moving = false;
    
    
    export var zIndex = 1;
  
    let bubbleMenu: HTMLElement
    let element: HTMLDivElement
    let editor: Editor

    const removeEditor = createEventDispatcher();
    const toFocus = createEventDispatcher();
  
    onMount(() => {
      editor = new Editor({
        element: element,
        extensions: [
            StarterKit,
            BubbleMenu.configure({
                element: bubbleMenu
            })
        ],
            editorProps: {
                attributes: {
                class: 'overflow-auto h-full rounded-25px',
                },
            },
        content: '<p>Hello World! 🌍️ </p>',
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor
        },
      })
    })
  
    onDestroy(() => {
    if (editor) {
        editor.destroy()
      }
    })

    function onMouseDown() {
		moving = true;
        
	}

    function onTouchStart(e: TouchEvent) {
        moving = true;
        const touch = e.touches[0];
        initialleft = touch.pageX - left;
        initialtop = touch.pageY - top;
    }

    function onMoveEnd() {
		moving = false;
	}
	
	function onMouseMove(e: { movementX: number; movementY: number; }) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;

            positionCorrection()
		}
	}

    function onTouchMove(e: TouchEvent) {
        if (moving) {
            const touch = e.touches[0];
            left = touch.pageX - initialleft;
            top = touch.pageY - initialtop;

            positionCorrection();
        }
    }

    function positionCorrection(){
        if (left > document.body.clientWidth-360) {
                left = document.body.clientWidth-360;
        }else if (left < 0) {
                left = 0
        }
    }
</script>