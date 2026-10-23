<script>
  let { table } = $props();
</script>

<table class="w-full text-left border-collapse">
  <thead>
    <tr>
      {#each table.headings as heading}
        <th class="py-2 pr-4 border-b border-hairline font-semibold text-paper">{heading}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each table.rows as row}
      <tr>
        {#each row as cell}
          <td class="py-2 pr-4 border-b border-hairline align-top">{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
