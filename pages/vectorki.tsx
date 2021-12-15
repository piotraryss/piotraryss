import React from 'react'
import type { ReactElement } from 'react'
import Layout from '../components/layout'
import LayoutNested from '../components/layout-nested'

export default function Page() {
  return (
    <>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget gravida eros. Aenean orci lectus, lacinia eu felis at, bibendum blandit lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque urna ex, bibendum auctor nulla quis, posuere eleifend mauris. Donec consectetur augue turpis, tincidunt volutpat massa tristique ut. Donec vulputate nunc nec pretium lacinia. Nunc posuere imperdiet mollis. Morbi cursus tortor et ipsum fringilla commodo. Donec sollicitudin porta libero, a dictum nulla. Ut eu ante neque. Donec sit amet ipsum tellus. Suspendisse tempus, justo eu consequat lobortis, nulla urna sodales felis, scelerisque pharetra lectus elit non ante. Vivamus vitae euismod ex.</p>
      <h2>Title 02</h2>
      <p>Suspendisse nec arcu feugiat diam mollis finibus sit amet vitae leo. Ut at enim nec ex lacinia bibendum. Proin elementum, magna eu fringilla vestibulum, quam nulla convallis tortor, vel consequat turpis enim ac lectus. Mauris tortor odio, molestie a metus ut, pharetra facilisis est. Aliquam nec neque at orci interdum efficitur. Aenean sagittis interdum lectus, nec bibendum purus egestas dapibus. Morbi suscipit risus vitae consequat vulputate. Nam consequat diam sed auctor condimentum. Sed eu ligula orci. Vivamus vestibulum interdum urna id sollicitudin. Praesent id nisi neque.</p>
      <h3>Title 03</h3>
      <p>Quisque sed fermentum lacus. In sodales elementum diam ac vulputate. Integer sodales diam vitae lectus sollicitudin, in facilisis tortor placerat. Morbi non orci lorem. Pellentesque et consequat lacus, in semper mauris. Nulla sagittis aliquam turpis eu mollis. Mauris in velit sed justo pellentesque condimentum. Fusce vitae ex in ante euismod congue sit amet quis augue. Integer vel varius dolor. Suspendisse diam ante, finibus ut accumsan sit amet, volutpat et sapien. Ut suscipit nibh in accumsan faucibus. Aenean pulvinar at tortor ut malesuada. Maecenas ullamcorper dolor bibendum augue tempor lacinia. Proin tempus euismod dui, quis bibendum neque.</p>
      <p>Aliquam porttitor interdum tellus, sed porttitor nisl consequat sed. Nunc id dictum dui. Aenean blandit magna a ante blandit suscipit. Pellentesque rhoncus non augue eget pellentesque. Aenean aliquet, arcu ac mattis finibus, ante ex mattis libero, in tempus quam tellus vel turpis. Sed mollis elit at vehicula consectetur. Pellentesque hendrerit sem vitae ornare posuere. Praesent egestas quam a dapibus pellentesque. Maecenas aliquet scelerisque nisi ut volutpat. Cras ut sapien ut nunc pellentesque elementum accumsan in elit. Maecenas fermentum convallis metus, in pulvinar eros efficitur eu. Nunc mollis elit eu tortor venenatis, at euismod quam rhoncus. Nullam quis mauris felis. Nunc posuere tempus felis a tempor.</p>
      <p>Curabitur aliquet maximus ipsum eget tincidunt. Sed tempus arcu sit amet sollicitudin pretium. Aenean nec interdum dolor. Nullam quis lorem non lacus tincidunt cursus. Vestibulum et rutrum diam. Nunc pretium sagittis velit. Aenean a sem a dui congue dignissim. Nam nec purus rutrum, facilisis velit et, vehicula enim. Nullam convallis, ante ac consectetur tincidunt, nulla sem mattis orci, rhoncus iaculis lorem ante vitae nunc. Nunc accumsan nec metus eget dictum. Donec libero diam, vestibulum porta odio quis, suscipit posuere lectus. Duis sem turpis, ullamcorper sed vehicula id, ornare quis ipsum. Duis felis tortor, pellentesque sed mauris id, dapibus elementum mi. Nullam tristique eros ac pretium aliquet. Vivamus hendrerit dui magna, sodales bibendum quam viverra sit amet.</p>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout>
        <LayoutNested>{page}</LayoutNested>
      </Layout>
    </>
  )
}
