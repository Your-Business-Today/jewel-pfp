<script>
  let { table } = $props();
</script>

<table class="w-full text-left border-collapse">
  <thead>
    <tr>
      {#each table.headings as heading}
        <th class="py-2 pr-4 border-b border-ink/20 font-semibold text-ink">{heading}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each table.rows as row}
      <tr>
        {#each row as cell}
          <td class="py-2 pr-4 border-b border-ink/10 align-top">{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
